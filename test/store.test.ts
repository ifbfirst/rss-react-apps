import { configureStore, createSlice } from '@reduxjs/toolkit';
import { peopleApi } from '../services/peopleApi';
import { expect, test, describe } from 'vitest';

const testSlice = createSlice({
  name: 'test',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

const testReducer = testSlice.reducer;

describe('Redux store', () => {
  const store = configureStore({
    reducer: {
      test: testReducer,
      [peopleApi.reducerPath]: peopleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(peopleApi.middleware),
  });

  test('store initializes with default state', () => {
    expect(store.getState().test.value).toBe(0);
  });

  test('increment action works correctly', () => {
    store.dispatch(testSlice.actions.increment());
    expect(store.getState().test.value).toBe(1);
  });

  test('peopleApi can be reached', async () => {
    const response = await store.dispatch(
      peopleApi.endpoints.fetchPeople.initiate({ page: 1 })
    );
    expect(response).toBeDefined();
  });
});
