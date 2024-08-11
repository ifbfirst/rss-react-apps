import React from 'react';
import { ThemeContextType } from '../interfaces/interfaces';

export const themes = {
  dark: 'dark',
  light: 'light',
};

const defaultTheme = {
  theme: themes.light,
  setTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeContextType>(defaultTheme);
