import { render, screen } from '@testing-library/react';
import PeopleList from '../components/PeopleList';
import { expect, test } from 'vitest';

test('renders a message when there are no cards', () => {
  render(<PeopleList people={[]} />);
  const message = screen.getByText(/There is no result... Try again./i);
  expect(message).toBeInTheDocument();
});
