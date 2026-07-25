import logoColor from "@/assets/logo-color.svg";
import logoWhite from "@/assets/logo-white.svg";
import { cn } from "../ui/utils";

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <img
      src={dark ? logoWhite : logoColor}
      alt="ITERI"
      className={cn(dark ? "h-6" : "h-8", "w-auto", className)}
    />
  );
}
