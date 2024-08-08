import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { peopleApi } from '../services/peopleApi';
import rootReducer from '../stores/reducers';

describe('Redux Store', () => {
  it('should configure the store with the correct reducers and middlewares', () => {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(peopleApi.middleware),
    });

    const initialState = store.getState();
    expect(initialState).toMatchObject({
      people: {},
      [peopleApi.reducerPath]: {
        queries: {},
        mutations: {},
      },
    });
  });
});
