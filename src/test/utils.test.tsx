import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../utils';

describe('localStorage functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should set item to localStorage', () => {
    const key = 'testKey';
    const value = { name: 'Test', age: 30 };

    setItemToLocalStorage(key, value);

    const storedItem = localStorage.getItem(key);
    expect(storedItem).toBeTruthy();
    expect(JSON.parse(storedItem as string).value).toEqual(value);
  });

  it('should get item from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'Test', age: 30 };
    localStorage.setItem(key, JSON.stringify({ value }));

    const retrievedValue = getItemFromLocalStorage(key);
    expect(retrievedValue).toEqual(value);
  });

  it('should return undefined if item does not exist', () => {
    const result = getItemFromLocalStorage('nonExistentKey');
    expect(result).toBeUndefined();
  });
});
