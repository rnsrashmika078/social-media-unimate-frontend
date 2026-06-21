import { Message } from "@langchain/core/messages";

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
  const thisDay = new Date().getDate();
  const thisMonth = new Date().getMonth();

  const postedDay = new Date(date).getDate();
  const postedMonth = new Date(date).getMonth();
  const dayToModify = new Date(date);

  if (thisDay >= postedDay || thisMonth >= postedMonth) {
    const hour = dayToModify.getUTCHours();
    const min = String(dayToModify.getUTCMinutes()).padStart(2, "0");
    return `Today at ${hour}:${min}`;
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
