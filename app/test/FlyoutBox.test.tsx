import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import { addPersonToList, clearPersonList } from '../stores/peopleSlice';
import { beforeEach, describe, expect, it } from 'vitest';
import FlyoutBox from '../components/FlyoutBox';
import store from '../stores';

describe('FlyoutBox', () => {
  beforeEach(() => {
    store.dispatch(clearPersonList());
  });

  it('should show the correct number of selected items', () => {
    store.dispatch(
      addPersonToList({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        gender: 'male',
      })
    );
    render(
      <Provider store={store}>
        <FlyoutBox />
      </Provider>
    );

    expect(screen.getByText('1 items are selected')).toBeInTheDocument();
  });

  it('should dispatch clearPersonList when the button is clicked', () => {
    store.dispatch(
      addPersonToList({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        gender: 'male',
      })
    );
    render(
      <Provider store={store}>
        <FlyoutBox />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    expect(store.getState().people.personList).toHaveLength(0);
  });
});

it('should trigger a download when the button is clicked', () => {
  store.dispatch(
    addPersonToList({
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
    })
  );

  render(
    <Provider store={store}>
      <FlyoutBox />
    </Provider>
  );

  const downloadLink = screen.getByText('Download');
  fireEvent.click(downloadLink);
  expect(downloadLink).toHaveAttribute(
    'download',
    expect.stringContaining('people.csv')
  );
});
