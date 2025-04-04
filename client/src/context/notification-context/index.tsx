import { createContext, useContext, useState } from "react";
import {
  Notification,
  NotificationContextData,
  NotificationLevel,
  defaultNotificationContextData,
  // dummyToasts,
} from "./types";
import Toast from "./toast";

const NotificationContext = createContext<NotificationContextData>(
  defaultNotificationContextData
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toastNotifications, setToastNotifications] =
    useState<Notification[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const showToast = (message: string, level?: NotificationLevel) => {
    const key = Math.ceil(Math.random() * 100000).toString();
    setToastNotifications((prev: Notification[]) => [
      ...prev,
      { key, message, level: level ?? "info" },
    ]);
  };

  const removeToast = (key: string) => {
    setToastNotifications((prev) => prev.filter((toast) => toast.key !== key));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, showToast }}
    >
      <>
        {children}
        <div className="fixed left-4 bottom-4 flex flex-col z-50">
          {toastNotifications.reverse().map((toast) => (
            <Toast
              key={toast.key}
              toastData={toast}
              removeToast={removeToast}
            />
          ))}
        </div>
      </>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
