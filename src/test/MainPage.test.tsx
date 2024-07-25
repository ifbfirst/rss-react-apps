import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { beforeEach, describe, expect, it } from 'vitest';
import MainPage from '../pages/MainPage';
import store from '../stores';

describe('MainPage', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders the header', () => {
    expect(screen.getByText(/Star Wars People Finders/i)).toBeInTheDocument();
  });

  it('renders the theme switcher', () => {
    expect(screen.getByText(/Change theme/i)).toBeInTheDocument();
  });

  it('renders a loader while fetching data', () => {
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('toggles theme on theme switch icon click', () => {
    const themeIcon = screen.getByTestId('theme-switch');
    fireEvent.click(themeIcon);
    expect(themeIcon).toBeInTheDocument();
  });
});
