"use client";
import { useNotificationContext } from "@/app/providers/NotificationProvider";
import { getNotificationQuery } from "@/app/queryOptions/notificationQuery";
import { RootState } from "@/app/store/store";
import { NotificationType } from "@/app/types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { AiFillBell } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";

const Notification = () => {
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const { data: notify, isLoading } = useQuery(
    getNotificationQuery(authUser?.id),
  );

  
  if (isLoading) {
    <FaSpinner />;
  }
  if (!notify || notify.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-foreground">
        <AiFillBell size={40} className="mb-2 opacity-60" />
        <p className="text-sm">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-4 space-y-3">
      {notify.map((n: NotificationType) => (
        <div
          key={n.id}
          className="flex items-start gap-3 p-4 rounded-xl shadow-sm border bg-white hover:shadow-md transition"
        >
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <AiFillBell size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-800">{n.message}</p>
            {n.created_at && (
              <span className="text-xs text-gray-400">
                {new Date(n.created_at).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
