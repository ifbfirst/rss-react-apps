import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
import {
  initializeSearchText,
  peopleReducer,
  setSearchText,
} from '../stores/peopleSlice';
import React from 'react';
import { vi } from 'vitest';
import Search from '../components/Search';
import '@testing-library/jest-dom';

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

vi.stubGlobal('localStorage', mockLocalStorage);

describe('Search Component', () => {
  let store: Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    mockLocalStorage.clear();
    store = configureStore({ reducer: { people: peopleReducer } });
    store.dispatch = vi.fn();
  });

  test('renders correctly', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(screen.getByPlaceholderText('')).toBeInTheDocument();
  });

  test('initializes search text from local storage', () => {
    mockLocalStorage.setItem(
      'searchText',
      JSON.stringify({ value: 'test search' })
    );

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      initializeSearchText('test search')
    );
    expect(screen.getByPlaceholderText('')).toHaveValue('test search');
  });

  test('updates input on change', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('');
    fireEvent.change(input, { target: { value: 'new search' } });

    expect(input).toHaveValue('new search');
  });

  test('submits the form and updates local storage', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.submit(searchButton);

    expect(store.dispatch).toHaveBeenCalledWith(setSearchText('search term'));
    expect(mockLocalStorage.getItem('searchText')).toBe(
      JSON.stringify({ value: 'search term' })
    );
  });
});
