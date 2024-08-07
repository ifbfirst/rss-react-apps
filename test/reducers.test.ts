import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';

import { setupListeners } from '@reduxjs/toolkit/query';
import { peopleApi } from '../services/peopleApi';
import rootReducer from '../stores/reducers';

describe('rootReducer', () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(peopleApi.middleware),
  });

  setupListeners(store.dispatch);

  it('should have initial state', () => {
    const state = store.getState();
    expect(state.people).toBeDefined();
    expect(state[peopleApi.reducerPath]).toBeDefined();
  });

  it('should handle fetchPeople query', async () => {
    const response = await store.dispatch(
      peopleApi.endpoints.fetchPeople.initiate({ page: 1 })
    );

    expect(response.data).toBeDefined();
  });
});
