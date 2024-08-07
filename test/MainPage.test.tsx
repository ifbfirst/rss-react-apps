import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MainPage from '../pages';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'next/router';
import React from 'react';
import '@testing-library/jest-dom';

const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: mockPush,
  replace: mockReplace,
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn().mockResolvedValue(undefined),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
};
vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

const mockStore = configureStore([]);

describe('MainPage', () => {
  let store: MockStoreEnhanced<unknown, unknown>;

  beforeEach(() => {
    store = mockStore({
      people: {
        searchText: '',
        page: 1,
        personList: [],
      },
    });

    vi.mock('../stores/reducers', () => ({
      useFetchPeopleQuery: () => ({
        data: {
          count: 10,
          results: [{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }],
        },
        isFetching: false,
        refetch: vi.fn(),
      }),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header and search input', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/star wars people finders/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('displays the list of people', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(await screen.findByText(/Darth Vader/i)).toBeInTheDocument();
  });

  it('shows detail when a person is selected', async () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const person = await screen.findByText('Luke Skywalker');
    fireEvent.click(person);
  });
});
