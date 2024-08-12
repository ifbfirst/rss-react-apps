import { combineReducers } from '@reduxjs/toolkit';
import { configSlice } from './reducer';

const rootReducer = combineReducers({
  questions: configSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
