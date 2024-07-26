import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import { describe, expect, it, vi, afterEach } from 'vitest';
import ErrorPage from '../pages/ErrorPage';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

describe('ErrorPage Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders the error message and the specific error when available', () => {
    const testError = new Error('Test error');
    (useRouteError as vi.Mock).mockReturnValue(testError);

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

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
    expect(screen.getByText(/Error: Test error/i)).toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalledWith(testError);

    consoleErrorSpy.mockRestore();
  });

  it('logs the error to the console', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const testError = new Error('Test error');
    (useRouteError as vi.Mock).mockReturnValue(testError);

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
