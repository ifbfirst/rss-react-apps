'use client';
import { ThemeContextType } from '@/interfaces/interfaces';
import React from 'react';

export const themes = {
  dark: 'dark',
  light: 'light',
};

const defaultTheme = {
  theme: themes.light,
  setTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeContextType>(defaultTheme);
