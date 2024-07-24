import { describe, it, expect } from 'vitest';
import { peopleSlice } from '../stores/peopleSlice';
import { Person } from '../interfaces';

const { actions, reducer } = peopleSlice;

const initialState = {
  searchText: '',
  page: 1,
  personList: [] as Person[],
};

describe('peopleSlice', () => {
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
});
