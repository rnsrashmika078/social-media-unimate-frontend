export const setHash = (value: string) => {
  if (typeof window === "undefined") return;
  window.history.pushState(null, "", `#${value}`);
};
export const replaceHash = () => {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", `#`);
};
