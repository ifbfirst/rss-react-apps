import { describe, it, expect, beforeEach } from 'vitest';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../utils';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('LocalStorage Utility Functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('setItemToLocalStorage should store the item in localStorage', () => {
    const key = 'testKey';
    const value = { name: 'testName' };

    setItemToLocalStorage(key, value);

    const storedItem = localStorage.getItem(key);
    expect(storedItem).toBe(JSON.stringify({ value }));
  });

  it('getItemFromLocalStorage should retrieve the item from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'testName' };

    localStorage.setItem(key, JSON.stringify({ value }));

    const retrievedItem = getItemFromLocalStorage(key);
    expect(retrievedItem).toEqual(value);
  });

  it('getItemFromLocalStorage should return undefined if the item does not exist', () => {
    const key = 'nonExistentKey';

    const retrievedItem = getItemFromLocalStorage(key);
    expect(retrievedItem).toBeUndefined();
  });
});
