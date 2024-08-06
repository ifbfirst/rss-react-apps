export function setItemToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify({ value }));
}

export function getItemFromLocalStorage(key: string) {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item).value;
}

export const updateURLParams = (params: { [key: string]: any }) => {
  const url = new URL(window.location.href);
  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, params[key]);
  });
  window.history.pushState({}, '', url);
};
