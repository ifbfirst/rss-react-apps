import { describe, it, expect } from 'vitest';

import { Person } from '../interfaces';
import {
  addPersonToList,
  clearPersonList,
  peopleReducer,
  removePersonFromList,
  setPage,
  setSearchText,
} from '../stores/peopleSlice';

describe('peopleSlice', () => {
  const initialState = {
    searchText: '',
    page: 1,
    personList: [],
  };

  it('should handle setSearchText', () => {
    const newSearchText = 'John';
    const result = peopleReducer(initialState, setSearchText(newSearchText));
    expect(result.searchText).toEqual(newSearchText);
  });

  it('should handle setPage', () => {
    const newPage = 2;
    const result = peopleReducer(initialState, setPage(newPage));
    expect(result.page).toEqual(newPage);
  });

  it('should handle addPersonToList', () => {
    const person: Person = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
    };
    const result = peopleReducer(initialState, addPersonToList(person));
    expect(result.personList).toEqual([person]);
  });

  it('should handle removePersonFromList', () => {
    const person1: Person = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
    };
    const person2: Person = {
      name: 'R2-D2',
      height: '96',
      mass: '32',
      gender: 'n/a',
    };
    const initialStateWithPeople = {
      ...initialState,
      personList: [person1, person2],
    };
    const result = peopleReducer(
      initialStateWithPeople,
      removePersonFromList(person1)
    );
    expect(result.personList).toEqual([person2]);
  });

  it('should handle clearPersonList', () => {
    const person: Person = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
    };
    const initialStateWithPeople = {
      ...initialState,
      personList: [person],
    };
    const result = peopleReducer(initialStateWithPeople, clearPersonList());
    expect(result.personList).toEqual([]);
  });
});
