import { useEffect, useState } from 'react';
import { ThemeContext, themes } from './ThemeContext';
import { ThemeProviderProps } from '../../interfaces';

const getTheme = () => {
  const theme = `${localStorage.getItem('theme')}`;
  if (Object.values(themes).includes(theme)) return theme;

  const userMedia = window.matchMedia('(prefers-color-scheme:light)');
  if (userMedia.matches) return themes.light;
  return themes.dark;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

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
