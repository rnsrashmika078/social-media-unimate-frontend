import { queryOptions } from "@tanstack/react-query";
import { getNotification } from "../helper/notification";

export function getNotificationQuery(id: number | undefined) {
  return queryOptions({
    enabled: !!id,
    queryKey: ["notification", id],
    queryFn: () => getNotification(id!),
    retry: 3,
  });
}
