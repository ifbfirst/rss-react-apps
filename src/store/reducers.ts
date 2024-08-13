import { combineReducers } from '@reduxjs/toolkit';
import { dataSlice } from './reducer';

const rootReducer = combineReducers({
  data: dataSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
