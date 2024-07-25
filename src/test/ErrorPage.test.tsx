import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ErrorPage from '../pages/ErrorPage';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

describe('ErrorPage Component', () => {
  it('renders the error message', () => {
    const testError = new Error('Test error');

    (useRouteError as jest.Mock).mockReturnValue(testError);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, an unexpected error has occurred/i)
    ).toBeInTheDocument();
  });

  it('logs the error to the console', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const testError = new Error('Test error');
    (useRouteError as jest.Mock).mockReturnValue(testError);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(testError);
    consoleErrorSpy.mockRestore();
  });
});
