export function getItemFromLocalStorage(key: string) {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item).value;
}

export function setItemToLocalStorage(key: string, value: string) {
  const item = JSON.stringify({ value });
  localStorage.setItem(key, item);
}

export const updateURLParams = (params: { [key: string]: any }) => {
  const url = new URL(window.location.href);
  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, params[key]);
  });
  window.history.pushState({}, '', url);
};
