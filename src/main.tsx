import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import DetailsPage from './pages/DetailsPage';
import MainPage from './pages/MainPage';
import { Provider } from 'react-redux';
import store from './stores';

const router = createBrowserRouter([
  {
    path: '*',
    errorElement: <ErrorPage />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
