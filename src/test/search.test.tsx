import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import MainPage from '../pages/MainPage';

describe('Root Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should save search input to local storage when search button is clicked', async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('');
    const searchButton = screen.getByText('search');

    fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(localStorage.getItem('searchQuery')).toBe('Luke Skywalker');
    });
  });

  it('should retrieve search input from local storage when component mounts', () => {
    localStorage.setItem('searchQuery', 'Darth Vader');

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
  });
});
