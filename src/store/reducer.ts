import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataStore } from '../interfaces';

const initialState: DataStore = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: '',
  country: '',
  image: '',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
  },
});

export const {
  setName,
  setAge,
  setEmail,
  setPassword,
  setGender,
  setCountry,
  setImage,
} = dataSlice.actions;

export const configReducer = dataSlice.reducer;
