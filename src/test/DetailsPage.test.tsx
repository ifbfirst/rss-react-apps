import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { afterEach, describe, expect, it, vi } from 'vitest';
import * as peopleApi from '../services/peopleApi';
import store from '../stores';
import DetailsPage from '../pages/DetailsPage';

vi.mock('../services/peopleApi', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useFetchPersonQuery: vi.fn(),
  };
});

const setup = (detailsId: string) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/details/${detailsId}`]}>
        <DetailsPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('DetailsPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', async () => {
    (peopleApi.useFetchPersonQuery as vi.Mock).mockReturnValue({
      data: null,
      isFetching: true,
    });

    setup('1');

    const preloader = await screen.findByTestId('loader');
    expect(preloader).toBeInTheDocument();
  });

  it('should render person details', async () => {
    const mockData = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    (peopleApi.useFetchPersonQuery as vi.Mock).mockReturnValue({
      data: mockData,
      isFetching: true,
    });

    setup('1');

    const preloader = await screen.findByTestId('loader');
    expect(preloader).toBeInTheDocument();
  });

  it('should render person details', () => {
    const mockData = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    (peopleApi.useFetchPersonQuery as vi.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });

    setup('1');

    expect(screen.getByText(/details/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/hair color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/skin color: fair/i)).toBeInTheDocument();
    expect(screen.getByText(/eye color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/birth year: 19bby/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
  });

  it('should navigate back to the home page when clicking outside of the details', () => {
    const mockData = {
      name: 'Luke Skywalker',
    };

    (peopleApi.useFetchPersonQuery as vi.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });

    setup('1');

    // Simulate a click outside of the details element
    fireEvent.click(document.body);

    expect(global.window.location.pathname).toBe('/'); // This may need adjustment based on your actual router setup
  });
});
