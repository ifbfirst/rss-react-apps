import { combineReducers } from '@reduxjs/toolkit';
import { peopleReducer } from './peopleSlice';
import { peopleApi } from '../services/peopleApi';

const rootReducer = combineReducers({
  people: peopleReducer,
  [peopleApi.reducerPath]: peopleApi.reducer,
});

export const {
  useFetchPeopleQuery = peopleApi.endpoints.fetchPeople
    .useQuery as typeof peopleApi.endpoints.fetchPeople.useQuery,
  useFetchPersonQuery = peopleApi.endpoints.fetchPerson
    .useQuery as typeof peopleApi.endpoints.fetchPerson.useQuery,
} = peopleApi;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
