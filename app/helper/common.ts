import { Message } from "@langchain/core/messages";
import {
  FriendsType,
  NotificationType,
  TypeOfNotifications,
} from "../types/globalTypes";

export const setHash = (value: string) => {
  if (typeof window === "undefined") return;
  window.history.pushState(null, "", `#${value}`);
};
export const replaceHash = () => {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", `#`);
};
export const convertDateTime = (date: string) => {
  // hydration error can be occrred
  const today = new Date().getDate();
  const thisMonth = new Date().getMonth();

  const postedDay = new Date(date).getDate();
  const postedMonth = new Date(date).getMonth();
  const dayToModify = new Date(date);

  const day =
    today == postedDay && postedMonth == thisMonth
      ? "Today"
      : postedDay == today - 1
        ? "Yesterday"
        : "";

  if (
    (today == postedDay && postedMonth == thisMonth) ||
    postedDay == today - 1
  ) {
    const hour = dayToModify.getHours();
    const min = String(dayToModify.getMinutes()).padStart(2, "0");
    return `${day} at ${hour}:${min}`;
  }
  return dayToModify.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const isAiMessage = (msg: Message) => {
  if (msg.type === "ai") {
    return true;
  }
};
export const isToolMessage = (msg: Message) => {
  if (msg.type === "tool") {
    return true;
  }
};

export const extractContent = (msg: Message): string => {
  if (Array.isArray(msg.content)) {
    return msg.content.map((m) =>
      m.type === "text" ? m.text : "",
    )[0] as string;
  }
  if (typeof msg.content === "string") {
    return msg.content;
  }
  return msg.content;
};

export const modifyNotifyMessage = (data: NotificationType): string => {
  if (data.is_send_by_me) {
    return `You have sent friend request to  ${data.receiver?.firstname} ${data.receiver?.lastname}`;
  } else {
    return `You have received friend request from ${data.sender?.firstname} ${data.sender?.lastname}`;
  }
};
export const modifyFriendsList = (data: FriendsType): string => {
  if (data.is_send_by_me) {
    return `${data.receiver?.firstname} ${data.receiver?.lastname}`;
  } else {
    return `${data.sender?.firstname} ${data.sender?.lastname}`;
  }
};
