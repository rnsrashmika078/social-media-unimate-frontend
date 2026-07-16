export function setLocalStorage(key: string, value: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
}
export function getLocalStorage(key: string) {
  if (typeof window === "undefined") return;
  const value = localStorage.getItem(key);
  return value;
}
export function removeLocalStorage(key:string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);

}
