import { describe, it, expect } from 'vitest';
import { peopleSlice } from '../stores/peopleSlice';
import { Person } from '../interfaces';

const { actions, reducer } = peopleSlice;

const initialState = {
  people: [] as Person[],
  isFetching: false,
  searchText: '',
  page: 1,
  resultCount: 0,
};

describe('peopleSlice', () => {
  it('should set people', () => {
    const people: Person[] = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
      },
    ];
    const newState = reducer(initialState, actions.setPeople(people));
    expect(newState.people).toEqual(people);
  });

  it('should set fetching state', () => {
    const newState = reducer(initialState, actions.setIsFetching(true));
    expect(newState.isFetching).toBe(true);
  });

  it('should set search text', () => {
    const newSearchText = 'Doe';
    const newState = reducer(
      initialState,
      actions.setSearchText(newSearchText)
    );
    expect(newState.searchText).toBe(newSearchText);
  });

  it('should set page', () => {
    const newPage = 2;
    const newState = reducer(initialState, actions.setPage(newPage));
    expect(newState.page).toBe(newPage);
  });

  it('should set result count', () => {
    const newCount = 10;
    const newState = reducer(initialState, actions.setResultCount(newCount));
    expect(newState.resultCount).toBe(newCount);
  });
});
