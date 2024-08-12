import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  amount: string;
  category: string;
  difficulty: string;
  time: string;
  type: string;
}

const initialState: ConfigState = {
  amount: '10',
  category: '9',
  difficulty: 'easy',
  time: '3',
  type: 'multiple',
};

export const configSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    setCountQuestions(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
  },
});

export const { setCountQuestions } = configSlice.actions;

export const configReducer = configSlice.reducer;
