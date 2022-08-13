import { createContext, ReactNode, useState } from "react";
import useUserContext from "../Hooks/useUserContext";
import getUser from "../pages/api/[[...test]]";
interface NotificationContextProvider {
  children: ReactNode;
}

interface NotificationContext {
  createNotification?: (userId: string, postId: string, text?: string) => void;
  updateNotification?: (notificationId: String) => void;
}

const initialState: NotificationContext = {};

export const NotificationContext =
  createContext<NotificationContext>(initialState);

export function NotificationContextProvider({
  children,
}: NotificationContextProvider) {
  const [notifications, setNotifications] = useState();
  const { getUser } = useUserContext();

  async function createNotification(
    userId: string,
    postId: string,
    text?: string
  ) {
    const notificationInfo = {
      user_id: userId,
      post_id: postId,
      text: text,
    };
    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify(notificationInfo),
      });
      const result = await response.json();
      setNotifications(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateNotification(notificationId: String) {
    try {
      const response = await fetch("/api/notifications", {
        method: "PUT",
        body: JSON.stringify(notificationId),
      });
      const result = await response.json();
      setNotifications(result);
      getUser(result.userNotification_id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <NotificationContext.Provider
      value={{ createNotification, updateNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
