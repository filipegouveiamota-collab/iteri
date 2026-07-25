import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import * as api from "../lib/api";
import type { Notification } from "../lib/types";
import { useAuth } from "./AuthContext";

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  refresh: () => Promise<void>;
  markRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const refresh = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      return;
    }
    const list = await api.getNotifications(user.id);
    setNotifications(list);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markRead = async (id: string) => {
    await api.markNotificationRead(id);
    await refresh();
  };

  const markAllRead = async () => {
    if (!user) return;
    await api.markAllNotificationsRead(user.id);
    await refresh();
  };

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      refresh,
      markRead,
      markAllRead,
    }),
    [notifications, refresh]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
