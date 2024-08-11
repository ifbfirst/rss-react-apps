import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { peopleApi } from '../services/peopleApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});
setupListeners(store.dispatch);
export default store;
