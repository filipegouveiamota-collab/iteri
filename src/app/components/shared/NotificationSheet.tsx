import { Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { useNotifications } from "../../contexts/NotificationContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "agora";
  if (minutes < 60) return `${minutes}min atrás`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h atrás`;
  return `${Math.floor(hours / 24)}d atrás`;
}

export function NotificationSheet() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-full bg-[#f9fafb] hover:bg-teal-50 transition-colors"
          aria-label="Notificações"
        >
          <Bell className="size-5 text-[#1f2937]" strokeWidth={2} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-coral-500 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle>Notificações</SheetTitle>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => markAllRead()}>
              Marcar todas como lidas
            </Button>
          )}
        </SheetHeader>
        <div className="flex flex-col gap-1 overflow-y-auto px-4 pb-4">
          {notifications.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              Você não tem notificações.
            </p>
          )}
          {notifications.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={async () => {
                await markRead(n.id);
                if (n.link) navigate(n.link);
              }}
              className={`text-left rounded-lg p-3 transition-colors hover:bg-muted ${
                n.read ? "bg-transparent" : "bg-teal-50"
              }`}
            >
              <p className="text-sm font-medium text-foreground">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{timeAgo(n.createdAt)}</p>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
