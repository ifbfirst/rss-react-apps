import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const onNextPageClick = vi.fn();
  const onPrevPageClick = vi.fn();

  it('renders correctly with navigation', () => {
    render(
      <Pagination
        nav={{ current: 2, total: 5 }}
        disable={{ left: false, right: false }}
        onNextPageClick={onNextPageClick}
        onPrevPageClick={onPrevPageClick}
      />
    );

    expect(screen.getByText('2 / 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /</ })).toBeEnabled();
    expect(screen.getByRole('button', { name: />/ })).toBeEnabled();
  });

  it('handles next and previous button clicks', () => {
    render(
      <Pagination
        nav={{ current: 2, total: 5 }}
        disable={{ left: false, right: false }}
        onNextPageClick={onNextPageClick}
        onPrevPageClick={onPrevPageClick}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: />/ }));
    expect(onNextPageClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /</ }));
    expect(onPrevPageClick).toHaveBeenCalledTimes(1);
  });

  it('disables buttons correctly', () => {
    render(
      <Pagination
        nav={{ current: 1, total: 5 }}
        disable={{ left: true, right: false }}
        onNextPageClick={onNextPageClick}
        onPrevPageClick={onPrevPageClick}
      />
    );

    expect(screen.getByRole('button', { name: /</ })).toBeDisabled();
    expect(screen.getByRole('button', { name: />/ })).toBeEnabled();
  });

  it('disables next button when on last page', () => {
    render(
      <Pagination
        nav={{ current: 5, total: 5 }}
        disable={{ left: false, right: true }}
        onNextPageClick={onNextPageClick}
        onPrevPageClick={onPrevPageClick}
      />
    );

    expect(screen.getByRole('button', { name: /</ })).toBeEnabled();
    expect(screen.getByRole('button', { name: />/ })).toBeDisabled();
  });
});
