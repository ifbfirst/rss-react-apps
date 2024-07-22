import { combineReducers } from '@reduxjs/toolkit';
import { peopleReducer } from './peopleSlice';
import { peopleApi } from '../services/peopleApi';

const rootReducer = combineReducers({
  people: peopleReducer,
  [peopleApi.reducerPath]: peopleApi.reducer,
});

export const { useFetchPeopleQuery, useFetchPersonQuery } = peopleApi;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
