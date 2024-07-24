import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { PeopleResponse, Person } from '../interfaces';

export interface FetchPeopleQuery {
  searchText?: string;
  page?: number;
}

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchPeople: builder.query<PeopleResponse, FetchPeopleQuery>({
      query: ({ searchText, page }) =>
        searchText ? `?search=${searchText}` : `?page=${page}`,
      transformResponse: (response: PeopleResponse) => response,
    }),
    fetchPerson: builder.query<Person, string>({
      query: (detailsId) => `?search=${detailsId}`,
      transformResponse: (response: PeopleResponse) => response.results[0],
    }),
  }),
});

export const useFetchPeopleQuery = peopleApi.endpoints.fetchPeople
  .useQuery as typeof peopleApi.endpoints.fetchPeople.useQuery;
export const useFetchPersonQuery = peopleApi.endpoints.fetchPerson
  .useQuery as typeof peopleApi.endpoints.fetchPerson.useQuery;
