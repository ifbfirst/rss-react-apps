import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeContext, themes } from '../theme/ThemeContext';
import ThemeProvider from '../theme/ThemeProvider';

describe('ThemeProvider', () => {
  beforeAll(() => {
    global.window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('light'),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
  });

  test('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('initializes with theme from localStorage', () => {
    localStorage.setItem('theme', themes.dark);

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <span>{theme}</span>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText(themes.dark)).toBeInTheDocument();
  });

  test('sets the document theme and localStorage when theme changes', async () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ setTheme }) => (
            <button onClick={() => setTheme(themes.light)}>Change Theme</button>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const button = screen.getByText('Change Theme');
    await button.click();

    expect(document.documentElement.dataset.theme).toBe(themes.light);
    expect(localStorage.getItem('theme')).toBe(themes.light);
  });

  test('responds to prefers-color-scheme media query', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <span>{theme}</span>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText(themes.light)).toBeInTheDocument();
  });
});
