import { useState, useEffect } from 'react';

export function setItemToLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify({ value }));
}

export function getItemFromLocalStorage(key: string) {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item).value;
}

const SEARCH_QUERY_KEY = 'searchQuery';

export function useSearchQuery(initialValue: string) {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const savedQuery = localStorage.getItem(SEARCH_QUERY_KEY);
    return savedQuery !== null ? savedQuery : initialValue;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(SEARCH_QUERY_KEY, searchQuery);
    };
  }, [searchQuery]);

  return [searchQuery, setSearchQuery] as const;
}
