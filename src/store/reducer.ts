import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataState {
  name: string;
  age: string;
  email: string;
  password: string;
  confPassword: string;
  gender: string;
}

const initialState: DataState = {
  name: '',
  age: '',
  email: '',
  password: '',
  confPassword: '',
  gender: '',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAge(state, action: PayloadAction<string>) {
      state.age = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setConfPassword(state, action: PayloadAction<string>) {
      state.confPassword = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
  },
});

export const {
  setName,
  setAge,
  setEmail,
  setPassword,
  setConfPassword,
  setGender,
} = dataSlice.actions;

export const configReducer = dataSlice.reducer;
