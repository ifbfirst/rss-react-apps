import ThemeProvider from '@/theme/ThemeProvider';
import '../styles/global.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../stores/store';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
