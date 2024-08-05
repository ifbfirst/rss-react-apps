import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Person } from '../interfaces';
import { describe, expect, it } from 'vitest';
import PeopleList from '../components/PeopleList';
import store from '../stores';

const mockPeople: Person[] = [
  { name: 'Luke Skywalker', height: '172', mass: '77', gender: 'male' },
];

describe('PeopleList Component', () => {
  it('renders a message when there are no people', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PeopleList people={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/There is no result.../)).toBeInTheDocument();
  });

  it('renders the people list correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PeopleList people={mockPeople} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
  });

  it('adds a person to the list when checkbox is checked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PeopleList people={mockPeople} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByLabelText(/Add to list/);
    fireEvent.click(checkbox);

    const state = store.getState();
    expect(state.people.personList).toContainEqual(mockPeople[0]);
  });

  it('removes a person from the list when checkbox is unchecked', () => {
    store.dispatch({ type: 'people/addPersonToList', payload: mockPeople[0] });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PeopleList people={mockPeople} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByLabelText(/Add to list/);
    fireEvent.click(checkbox);

    const state = store.getState();
    expect(state.people.personList).not.toContainEqual(mockPeople[0]);
  });
});
