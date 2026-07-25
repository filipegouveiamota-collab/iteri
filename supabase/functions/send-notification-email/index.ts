// Triggered by a plain Postgres trigger (public.notify_email_via_webhook, see
// supabase/migrations/20260725090000_notification_email_trigger.sql) using pg_net directly —
// NOT the dashboard's "Database Webhooks" feature, which depends on the platform-managed
// supabase_functions schema/http_request() function. That schema was missing on this project
// (a known Supabase provisioning gap, see github.com/orgs/supabase/discussions/36206 and
// related issues), so calling pg_net ourselves from a trigger we own sidesteps it entirely.
//
// Deployed with --no-verify-jwt because the caller is a Postgres trigger, not a logged-in user,
// so it never carries a Supabase JWT. Authentication instead comes from a shared secret
// (WEBHOOK_SECRET) that only this function and the calling trigger know — the trigger reads its
// copy from Supabase Vault, never from a committed file.
//
// Sends via Resend. We moved off SendGrid because PUC-Rio's mail servers rejected SendGrid's
// shared outbound IPs (550 ... IP is BLOCKLISTED, SPAMCOP/SPAMHAUS) intermittently — delivery
// depended on which shared IP each message happened to leave on. SUPABASE_URL and
// SUPABASE_SERVICE_ROLE_KEY are injected by the Edge Function runtime; RESEND_API_KEY,
// RESEND_FROM_EMAIL and WEBHOOK_SECRET are set with `supabase secrets set` and never reach
// the client bundle.
import { createClient } from "npm:@supabase/supabase-js@2";

interface NotificationRow {
  id: string;
  user_id: string;
  title: string;
  message: string;
  link: string | null;
}

interface WebhookPayload {
  type: "INSERT";
  table: "notifications";
  record: NotificationRow;
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL");
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://iteri.com.br";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Recipient names and notification bodies carry user-supplied text (a student's own name, an
// opportunity title written by an offerer), so they must never be interpolated into HTML raw.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !WEBHOOK_SECRET) {
    console.error("Missing RESEND_API_KEY, RESEND_FROM_EMAIL or WEBHOOK_SECRET secret");
    return new Response("Server misconfigured", { status: 500 });
  }
  if (req.headers.get("Authorization") !== `Bearer ${WEBHOOK_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = (await req.json()) as WebhookPayload;
  const notification = payload.record;

  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("email, name")
    .eq("id", notification.user_id)
    .single();

  if (error || !profile) {
    console.error("Could not resolve recipient profile", error);
    return new Response("Recipient not found", { status: 404 });
  }

  // Only the app's own relative paths are ever stored in notifications.link, so the URL is
  // built from SITE_URL rather than trusting the stored value as a full destination.
  const linkPath = notification.link && notification.link.startsWith("/") ? notification.link : "";
  const linkUrl = `${SITE_URL}${linkPath}`;

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #1f2937; line-height: 1.6;">
      <p>Olá, ${escapeHtml(profile.name)}.</p>
      <p>${escapeHtml(notification.message)}</p>
      <p>
        <a href="${linkUrl}" style="display: inline-block; background: #0d9488; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
          Ver na ITERI
        </a>
      </p>
      <p style="color: #6b7280; font-size: 12px;">ITERI — oportunidades remuneradas no campus.</p>
    </div>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `ITERI <${RESEND_FROM_EMAIL}>`,
      to: [profile.email],
      subject: notification.title,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const body = await resendResponse.text();
    console.error("Resend error", resendResponse.status, body);
    return new Response("Failed to send e-mail", { status: 502 });
  }

  return new Response("OK", { status: 200 });
});
