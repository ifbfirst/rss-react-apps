import { configureStore } from '@reduxjs/toolkit/react';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export { store };
