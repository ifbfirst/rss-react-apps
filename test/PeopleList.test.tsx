import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

import { Person } from '../interfaces/interfaces';
import { vi } from 'vitest';
import PeopleList from '../components/PeopleList';
import '@testing-library/jest-dom';
import { Store, UnknownAction } from 'redux';

const mockStore = configureStore([]);

describe('PeopleList', () => {
  let store:
    | MockStoreEnhanced<unknown, {}>
    | Store<unknown, UnknownAction, unknown>;

  const peopleMock: Person[] = [
    { name: 'Luke Skywalker', height: '172', mass: '77', gender: 'male' },
    { name: 'C-3PO', height: '167', mass: '75', gender: 'n/a' },
  ];

  beforeEach(() => {
    store = mockStore({
      people: {
        personList: [],
      },
    });
  });

  test('renders "There is no result..." when people list is empty', () => {
    render(
      <Provider store={store}>
        <PeopleList people={[]} onPersonSelect={vi.fn()} />
      </Provider>
    );

    expect(screen.getByText(/There is no result.../i)).toBeInTheDocument();
  });

  test('renders a list of people', () => {
    render(
      <Provider store={store}>
        <PeopleList people={peopleMock} onPersonSelect={vi.fn()} />
      </Provider>
    );

    const personCards = screen.getAllByTestId('person-card');
    expect(personCards).toHaveLength(2);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('C-3PO')).toBeInTheDocument();
  });

  test('calls onPersonSelect when a person card is clicked', () => {
    const onPersonSelect = vi.fn();

    render(
      <Provider store={store}>
        <PeopleList people={peopleMock} onPersonSelect={onPersonSelect} />
      </Provider>
    );

    const personCard = screen
      .getByText('Luke Skywalker')
      .closest('.person-card');
    if (personCard) fireEvent.click(personCard);

    expect(onPersonSelect).toHaveBeenCalledWith(peopleMock[0]);
  });
});
