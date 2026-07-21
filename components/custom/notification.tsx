"use client";
import { getNotificationQuery } from "@/app/queryOptions/notificationQuery";
import { RootState } from "@/app/store/store";
import { NotificationType } from "@/app/types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { memo, useCallback, useState } from "react";
import { AiFillBell } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { modifyNotifyMessage } from "@/app/helper/common";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { frontEndConfig } from "@/config";
import dynamic from "next/dynamic";

const EmptyList = dynamic(() => import("../profile/EmptyList"));

const NotificationWrapper = memo(() => {
  const [noCache, setNoCache] = useState<string>("no-required");
  const authUserId = useSelector((store: RootState) => store.auth.authUser?.id);
  const {
    data: notify,
    isFetching,
    refetch,
  } = useQuery(getNotificationQuery(authUserId, noCache));

  return (
    <div className="">
      <div className="flex  w-full justify-between">
        <h1 className="font-bold text-xl mt-2 mb-1">NOTIFICATIONS</h1>
        <h1 className="font-bold text-xl mt-2 mb-1">
          <RefreshCcw
            className={isFetching ? "animate-spin" : ""}
            size={15}
            onClick={() => {
              refetch();
              setNoCache("required");
            }}
          />
        </h1>
      </div>
      <hr className="mb-5"></hr>

      <Notification
        notify={notify}
        isLoading={isFetching}
        authUserId={authUserId!}
      />
    </div>
  );
});
NotificationWrapper.displayName = "NotificationWrapper";

interface NotificationProps {
  notify: NotificationType[];
  isLoading: boolean;
  authUserId: number;
}
const Notification = ({ notify, isLoading, authUserId }: NotificationProps) => {
  if (!authUserId) return;
  if (!notify || notify.length === 0) {
    return (
      <EmptyList
        condition={isLoading}
        icon={AiFillBell}
        description="No Notification yet"
      />
    );
  }

  return (
    <div className="w-full mx-auto space-y-3">
      {notify.map((n: NotificationType) => (
        <div
          key={n.id}
          className="flex items-center gap-3 p-4 rounded-xl shadow-sm border  bg-post-background hover:shadow-md transition"
        >
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <AiFillBell size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm">{modifyNotifyMessage(n)}</p>
            <p className="text-sm">{authUserId !== n.sender_id}</p>
            {n.created_at && (
              <span className="text-xs text-gray-500">
                {new Date(n.created_at).toLocaleString()}
              </span>
            )}
            {!n.is_send_by_me && (
              <div>
                <Link
                  href={`${frontEndConfig.PROTECTED.PROFILE}/${authUserId}`}
                >
                  <Button>Go there</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
NotificationWrapper.displayName = "NotificationWrapper";

export default NotificationWrapper;
