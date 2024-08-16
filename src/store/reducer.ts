import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataItem, DataStore } from '../interfaces';

const initialState: DataStore = {
  arrayData: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<DataItem>) {
      state.arrayData.push(action.payload);
    },
  },
});

export const { setData } = dataSlice.actions;

export const configReducer = dataSlice.reducer;
