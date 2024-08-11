import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { clearPersonList } from '../stores/peopleSlice';
import '@testing-library/jest-dom';
import FlyoutBox from '../components/FlyoutBox';

const initialState = {
  people: {
    personList: [{ name: 'Luke Skywalker' }, { name: 'C-3PO' }],
  },
};

const mockStore = configureMockStore();
const store = mockStore(initialState);

describe('FlyoutBox Component', () => {
  test('renders with correct number of selected items', () => {
    const { getByText } = render(
      <Provider store={store}>
        <FlyoutBox />
      </Provider>
    );

    expect(getByText(/2 items are selected/i)).toBeInTheDocument();
  });

  test('dispatches clearPersonList action on Unselect all button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <FlyoutBox />
      </Provider>
    );

    const button = getByText(/Unselect all/i);
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions).toContainEqual(clearPersonList());
  });
});
