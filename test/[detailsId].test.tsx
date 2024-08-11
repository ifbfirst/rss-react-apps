import { render, screen, waitFor } from '@testing-library/react';
import { useFetchPersonQuery } from '../services/peopleApi';

import React from 'react';
import '@testing-library/jest-dom';
import DetailsPage from '../pages/details/[detailsId]';
vi.mock('../services/peopleApi', () => ({
  useFetchPersonQuery: vi.fn(),
}));

describe('DetailsPage', () => {
  const mockOnClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays "No person details available." when data is not present', () => {
    (useFetchPersonQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });

    render(<DetailsPage personName="Luke Skywalker" onClose={mockOnClose} />);
  });

  it('renders person details when data is fetched', async () => {
    const mockData = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blonde',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    (useFetchPersonQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });

    render(<DetailsPage personName="Luke Skywalker" onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText(/Hair color: blonde/i)).toBeInTheDocument();
      expect(screen.getByText(/Skin color: fair/i)).toBeInTheDocument();
      expect(screen.getByText(/Eye color: blue/i)).toBeInTheDocument();
      expect(screen.getByText(/Birth year: 19bby/i)).toBeInTheDocument();
    });
  });

  it('calls onClose function when close icon is clicked', () => {
    (useFetchPersonQuery as jest.Mock).mockReturnValue({
      data: { name: 'Luke Skywalker' },
      isFetching: false,
    });

    render(<DetailsPage personName="Luke Skywalker" onClose={mockOnClose} />);

    const closeButton = screen.getByLabelText('Close details');
    closeButton.click();

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
