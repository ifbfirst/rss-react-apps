import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../interfaces';
import { getItemFromLocalStorage } from '../utils';

export interface PeopleState {
  people: Person[];
  isLoading: boolean;
  searchText: string;
  page: number;
  resultCount: number;
}

const initialState: PeopleState = {
  people: [],
  isLoading: true,
  searchText: getItemFromLocalStorage('searchText'),
  page: 1,
  resultCount: 0,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople(state, action: PayloadAction<Person[]>) {
      state.people = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
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
  setIsLoading,
  setSearchText,
  setPage,
  setResultCount,
} = peopleSlice.actions;

export const peopleReducer = peopleSlice.reducer;
