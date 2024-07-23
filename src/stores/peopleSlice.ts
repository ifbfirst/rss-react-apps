import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getItemFromLocalStorage } from '../utils';
import { Person } from '../interfaces';

export interface PeopleState {
  searchText: string;
  page: number;
  personList: Person[];
}

const initialState: PeopleState = {
  searchText: getItemFromLocalStorage('searchText'),
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
    removePersonFromList(state, action: PayloadAction<string>) {
      state.personList = state.personList.filter(
        (person) => person.name !== action.payload
      );
    },
  },
});

export const { setSearchText, setPage } = peopleSlice.actions;

export const peopleReducer = peopleSlice.reducer;
