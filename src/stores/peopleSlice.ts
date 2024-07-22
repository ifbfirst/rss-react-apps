import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../interfaces';
import { getItemFromLocalStorage } from '../utils';

export interface PeopleState {
  people: Person[];
  isFetching: boolean;
  searchText: string;
  page: number;
  resultCount: number;
}

const initialState: PeopleState = {
  people: [],
  isFetching: true,
  searchText: getItemFromLocalStorage('searchText'),
  page: 1,
  resultCount: 0,
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople(state, action: PayloadAction<Person[]>) {
      state.people = action.payload;
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setResultCount(state, action: PayloadAction<number>) {
      state.resultCount = action.payload;
    },
  },
});

export const {
  setPeople,
  setIsFetching,
  setSearchText,
  setPage,
  setResultCount,
} = peopleSlice.actions;

export const peopleReducer = peopleSlice.reducer;
