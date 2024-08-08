import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

import { vi } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { BASE_URL } from '../constants';
import { PeopleResponse } from '../interfaces/interfaces';
import { ThemeContext, themes } from '../theme/ThemeContext';
import MainPage from '../app/page';
import { fetchPeople } from '../app/api';

const mockStore = configureStore();

const renderWithProviders = (initialData: PeopleResponse) => {
  const store = mockStore({
    people: {
      searchText: '',
      page: 1,
      personList: [],
      people: [],
      pageCount: 1,
    },
  });

  return render(
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme: themes.light, setTheme: vi.fn() }}>
        <MemoryRouter>
          <ErrorBoundary>
            <MainPage initialData={initialData} initialPageCount={1} />
          </ErrorBoundary>
        </MemoryRouter>
      </ThemeContext.Provider>
    </Provider>
  );
};

describe('MainPage Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the header', () => {
    const initialData = { results: [], count: 0, next: null, previous: null };
    renderWithProviders(initialData);
    expect(screen.getByText(/Star Wars People Finders/i)).toBeInTheDocument();
  });

  it('displays a loader when fetching data', async () => {
    const mockResponse = {
      results: [],
      count: 0,
      next: null,
      previous: null,
    };

    const mockFetchResponse = new Response(JSON.stringify(mockResponse), {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' },
    });

    global.fetch = vi.fn(() => Promise.resolve(mockFetchResponse));

    renderWithProviders(mockResponse);
  });
});

global.fetch = vi.fn();

describe('fetchPeople', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch people with searchText and return data', async () => {
    const mockData = {
      results: [{ name: 'Luke Skywalker' }],
      count: 1,
      next: null,
      previous: null,
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const searchText = 'Luke';
    const page = 1;
    const result = await fetchPeople(searchText, page);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}?search=${encodeURIComponent(searchText)}`
    );
    expect(result).toEqual(mockData);
  });

  it('should fetch people without searchText and return data', async () => {
    const mockData = {
      results: [{ name: 'Darth Vader' }],
      count: 1,
      next: null,
      previous: null,
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const searchText = '';
    const page = 2;
    const result = await fetchPeople(searchText, page);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}?page=${page}`);
    expect(result).toEqual(mockData);
  });

  it('should throw an error if the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const searchText = 'Luke';
    const page = 1;

    await expect(fetchPeople(searchText, page)).rejects.toThrow(
      'Network response was not ok'
    );
  });
});
