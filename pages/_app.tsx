import '/index.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/app/stores';
import ThemeProvider from '@/app/theme/ThemeProvider';

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
