import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

type adminOrdersNotificationsType = {
  unreadOrdersCount: number;
  unreadOrdersIds: number[];
  fetchUnreadOrders: () => void;
  markOrderRead: (orderId: number) => void;
};

const adminOrdersNotifications = createContext<
  adminOrdersNotificationsType | undefined
>(undefined);

export function OrdersNotificationsProvider({
  children,
}: { children: ReactNode }) {
  const [unreadOrdersCount, setUnreadOrdersCount] = useState(0);
  const [unreadOrdersIds, setUnreadOrdersIds] = useState([]);
  const { currentUser, token } = useAuth();

  const fetchUnreadOrders = useCallback(async () => {
    if (!currentUser || currentUser.role !== "admin") {
      setUnreadOrdersCount(0);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/unread`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const unreadOrders = await response.json();
      setUnreadOrdersCount(unreadOrders.unreadOrdersCount);
      setUnreadOrdersIds(unreadOrders.unreadOrdersIds);
    } catch (error) {
      console.error(error);
    }
  }, [currentUser, token]);

  useEffect(() => {
    fetchUnreadOrders();
  }, [fetchUnreadOrders]);

  const markOrderRead = useCallback(
    async (orderId: number) => {
      try {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/order/read/${orderId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setUnreadOrdersIds((prev) => prev.filter((id) => id !== orderId));
        setUnreadOrdersCount((prev) => prev - 1);
      } catch (error) {
        console.error(error);
      }
    },
    [token],
  );

  return (
    <adminOrdersNotifications.Provider
      value={{
        unreadOrdersCount,
        unreadOrdersIds,
        markOrderRead,
        fetchUnreadOrders,
      }}
    >
      {children}
    </adminOrdersNotifications.Provider>
  );
}

export function useOrdersNotifs() {
  const context = useContext(adminOrdersNotifications);
  if (!context) {
    throw new Error("erreur");
  }
  return context;
}
