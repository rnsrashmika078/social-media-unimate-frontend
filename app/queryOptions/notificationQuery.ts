import { queryOptions } from "@tanstack/react-query";
import { getNotification } from "../helper/notification";

export function getNotificationQuery(
  id: number | undefined,
  noCache: string = "no-required",
) {
  return queryOptions({
    enabled: !!id,
    queryKey: ["notification", id, noCache],
    queryFn: () => getNotification(id!, noCache),
    retry: 3,
  });
}
