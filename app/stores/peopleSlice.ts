import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getItemFromLocalStorage } from '../utils';
import { Person } from '../interfaces';

export interface PeopleState {
  searchText: string;
  page: number;
  personList: Person[];
}

const initialState: PeopleState = {
  searchText: '',
  page: 1,
  personList: [],
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
  },
});

export const {
  setSearchText,
  setPage,
  addPersonToList,
  removePersonFromList,
  clearPersonList,
  initializeSearchText,
} = peopleSlice.actions;

export const peopleReducer = peopleSlice.reducer;
