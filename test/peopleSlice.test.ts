import { describe, it, expect } from 'vitest';
import {
  peopleSlice,
  PeopleState,
  setSearchText,
  setPage,
  addPersonToList,
  removePersonFromList,
  clearPersonList,
  initializeSearchText,
} from '../stores/peopleSlice';
import { Person } from '../interfaces/interfaces';

describe('peopleSlice', () => {
  const initialState: PeopleState = {
    searchText: '',
    page: 1,
    personList: [],
  };

  it('should handle initial state', () => {
    expect(peopleSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setSearchText', () => {
    const actual = peopleSlice.reducer(initialState, setSearchText('luke'));
    expect(actual.searchText).toEqual('luke');
  });

  it('should handle setPage', () => {
    const actual = peopleSlice.reducer(initialState, setPage(2));
    expect(actual.page).toEqual(2);
  });

  it('should handle addPersonToList', () => {
    const person: Person = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
    };
    const actual = peopleSlice.reducer(initialState, addPersonToList(person));
    expect(actual.personList).toContain(person);
  });

  it('should handle removePersonFromList', () => {
    const person: Person = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
    };
    const stateWithPerson: PeopleState = {
      ...initialState,
      personList: [person],
    };

    const actual = peopleSlice.reducer(
      stateWithPerson,
      removePersonFromList(person)
    );
    expect(actual.personList).not.toContain(person);
  });

  it('should handle clearPersonList', () => {
    const stateWithPersons: PeopleState = {
      ...initialState,
      personList: [
        { name: 'Luke Skywalker', height: '172', mass: '77', gender: 'male' },
      ],
    };

    const actual = peopleSlice.reducer(stateWithPersons, clearPersonList());
    expect(actual.personList).toEqual([]);
  });

  it('should handle initializeSearchText', () => {
    const actual = peopleSlice.reducer(
      initialState,
      initializeSearchText('luke')
    );
    expect(actual.searchText).toEqual('luke');
  });
});
