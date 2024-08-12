import './main.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/MainPage';
import FirstForm from './pages/FirstForm';
import SecondForm from './pages/SecondForm';

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'first',
        element: <FirstForm />,
      },
      {
        path: 'second',
        element: <SecondForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="app">
    <header className="header">
      <h1>Welcome!</h1>
    </header>
    <main className="main">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </main>
  </div>
);
