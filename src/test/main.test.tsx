import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import MainPage from '../pages/MainPage';
import DetailsPage from '../pages/DetailsPage';
import ErrorPage from '../pages/ErrorPage';
import store from '../stores';
import { act } from 'react';

describe('App Routing', () => {
  const router = createMemoryRouter([
    {
      path: '*',
      element: <ErrorPage />,
    },
    {
      path: '/',
      element: <MainPage />,
      children: [
        {
          path: 'details/:detailsId',
          element: <DetailsPage />,
        },
      ],
    },
  ]);

  it('renders the MainPage on the root path', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    expect(screen.getByText(/Star Wars People Finders/i)).toBeInTheDocument();
  });

  it('renders the DetailsPage when navigating to /details/R2-D2', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    await act(async () => {
      router.navigate('/details/R2-D2');
    });

    await waitFor(() => {
      expect(screen.getByText(/Details/i)).toBeInTheDocument();
    });
  });

  it('renders the ErrorPage for unknown routes', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    await act(async () => {
      router.navigate('/unknown-path');
    });
    await waitFor(() => {
      expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
    });
  });
});
