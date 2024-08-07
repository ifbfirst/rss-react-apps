import { useEffect, useState } from 'react';
import { ThemeContext, themes } from './ThemeContext';
import { ThemeProviderProps } from '../interfaces/interfaces';
import React from 'react';
const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return themes.light;
  }

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme && Object.values(themes).includes(storedTheme)) {
    return storedTheme;
  }

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  return userMedia.matches ? themes.light : themes.dark;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
