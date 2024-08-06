import ThemeProvider from '@/theme/ThemeProvider';
import '/index.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/stores';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
