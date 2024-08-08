import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getItemFromLocalStorage } from '../utils/utils';
import { Person } from '../interfaces/interfaces';

export interface PeopleState {
  searchText: string;
  page: number;
  personList: Person[];
  people: Person[];
  pageCount: number;
}

const initialState: PeopleState = {
  searchText: '',
  page: 1,
  personList: [],
  people: [],
  pageCount: 0,
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    addPersonToList(state, action: PayloadAction<Person>) {
      state.personList.push(action.payload);
    },
    removePersonFromList(state, action: PayloadAction<Person>) {
      state.personList = state.personList.filter(
        (person) => person.name !== action.payload.name
      );
    },
    clearPersonList(state) {
      state.personList.length = 0;
    },
    initializeSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setPeople(state, action: PayloadAction<Person[]>) {
      state.people = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
  },
});

export const {
  setSearchText,
  setPage,
  addPersonToList,
  removePersonFromList,
  clearPersonList,
  initializeSearchText,
  setPeople,
  setPageCount,
} = peopleSlice.actions;

export const peopleReducer = peopleSlice.reducer;
