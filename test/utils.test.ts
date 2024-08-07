import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setItemToLocalStorage, getItemFromLocalStorage } from '../utils/utils';

describe('Local Storage Functions', () => {
  const originalLocalStorage = { ...global.localStorage };

  beforeEach(() => {
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
    };

    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    global.localStorage = originalLocalStorage;
  });

  it('should set item to localStorage', () => {
    const key = 'testKey';
    const value = { name: 'test' };
    setItemToLocalStorage(key, value);

    expect((global.localStorage.setItem as vi.Mock).mock.calls[0][0]).toBe(key);
    expect((global.localStorage.setItem as vi.Mock).mock.calls[0][1]).toBe(
      JSON.stringify({ value })
    );
  });

  it('should get item from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'test' };
    const item = JSON.stringify({ value });

    (global.localStorage.getItem as vi.Mock).mockReturnValue(item);

    const retrievedValue = getItemFromLocalStorage(key);

    expect(retrievedValue).toEqual(value);
    expect((global.localStorage.getItem as vi.Mock).mock.calls[0][0]).toBe(key);
  });

  it('should return undefined if item does not exist in localStorage', () => {
    const key = 'nonExistentKey';

    (global.localStorage.getItem as vi.Mock).mockReturnValue(null);

    const retrievedValue = getItemFromLocalStorage(key);

    expect(retrievedValue).toBeUndefined();
    expect((global.localStorage.getItem as vi.Mock).mock.calls[0][0]).toBe(key);
  });
});
