export function setItemToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify({ value }));
}

export function getItemFromLocalStorage(key: string) {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item).value;
}

import { useState, useEffect } from 'react';

const SEARCH_QUERY_KEY = 'searchQuery';

export function useSearchQuery(initialValue: string) {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem(SEARCH_QUERY_KEY) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(SEARCH_QUERY_KEY, searchQuery);
  }, [searchQuery]);

  return [searchQuery, setSearchQuery] as const;
}
