import { combineReducers } from '@reduxjs/toolkit';
import { peopleReducer } from './peopleSlice';

const rootReducer = combineReducers({
  people: peopleReducer,
});

//export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
