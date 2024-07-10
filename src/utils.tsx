export function setItemToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify({ value }));
}

export function getItemFromLocalStorage(key: string) {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item).value;
}
