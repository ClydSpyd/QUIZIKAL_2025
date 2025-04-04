export type NotificationLevel = "info" | "success" | "warning" | "error";

export interface Notification {
  key: string;
  message: string;
  level: NotificationLevel;
}

export interface NotificationContextData {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  showToast: (message: string, level?: NotificationLevel) => void;
}

export const defaultNotificationContextData: NotificationContextData = {
  notifications: [],
  addNotification: () => {},
  showToast: () => {},
};

export const dummyToasts: Notification[] = [
  {
    key: "1",
    message: "This is a success message",
    level: "success",
  },
  {
    key: "2",
    message: "This is an info message",
    level: "info",
  },
  {
    key: "3",
    message: "This is a warning message",
    level: "warning",
  },
  {
    key: "4",
    message: "This is an error message",
    level: "error",
  },
];
