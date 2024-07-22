import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getItemFromLocalStorage } from '../utils';

export interface PeopleState {
  searchText: string;
  page: number;
}

const initialState: PeopleState = {
  searchText: getItemFromLocalStorage('searchText'),
  page: 1,
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
  },
});

export const { setSearchText, setPage } = peopleSlice.actions;

export const peopleReducer = peopleSlice.reducer;
