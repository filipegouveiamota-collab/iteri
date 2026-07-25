import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  accent = "teal",
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  accent?: "teal" | "coral" | "amber" | "success";
}) {
  const accentClasses = {
    teal: "bg-teal-50 text-teal-500",
    coral: "bg-coral-50 text-coral-500",
    amber: "bg-amber-50 text-amber-700",
    success: "bg-success-bg text-success-fg",
  }[accent];

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-5">
      <div className={`flex items-center justify-center size-12 rounded-xl ${accentClasses}`}>
        <Icon className="size-6" strokeWidth={2} />
      </div>
      <div>
        <p className="font-heading font-bold text-2xl text-[#1f2937]">{value}</p>
        <p className="text-sm text-[#6b7280]">{label}</p>
      </div>
    </div>
  );
}
