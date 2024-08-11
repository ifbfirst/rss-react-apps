import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: rootReducer,
});
setupListeners(store.dispatch);
export default store;
