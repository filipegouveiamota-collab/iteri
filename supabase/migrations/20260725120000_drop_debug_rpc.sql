-- Debugging aid from the notification-pipeline investigation is no longer needed now that the
-- Resend migration is verified working end to end. See 20260725094500_debug_notification_pipeline.sql.
drop function if exists public.debug_notification_pipeline();
