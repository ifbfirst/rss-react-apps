import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ThemeProvider from '../theme/ThemeProvider';
import MyApp from '../pages/_app';
import { Router } from 'next/router';
import '@testing-library/jest-dom';

beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => {
    return {
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
  });
});

const mockRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
};

const initialState = {};
const mockStore = configureStore({
  reducer: (state = initialState) => state,
});

describe('MyApp', () => {
  it('renders the child component correctly', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MyApp
            Component={() => <div>Hello, World!</div>}
            pageProps={{}}
            router={mockRouter as unknown as Router}
          />
        </ThemeProvider>
      </Provider>
    );

    expect(getByText('Hello, World!')).toBeInTheDocument();
  });

  it('renders ThemeProvider and Provider', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MyApp
            Component={() => <div>Test Component</div>}
            pageProps={{}}
            router={mockRouter as unknown as Router}
          />
        </ThemeProvider>
      </Provider>
    );

    expect(container).toBeDefined();
  });
});
