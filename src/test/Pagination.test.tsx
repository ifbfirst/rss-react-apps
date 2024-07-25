import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  it('should render correctly with navigation info', () => {
    const mockOnNextPageClick = vi.fn();
    const mockOnPrevPageClick = vi.fn();

    render(
      <Pagination
        onNextPageClick={mockOnNextPageClick}
        onPrevPageClick={mockOnPrevPageClick}
        disable={{ left: false, right: false }}
        nav={{ current: 1, total: 5 }}
      />
    );

    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '<' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '>' })).toBeInTheDocument();
  });

  it('should call onNextPageClick when Next button is clicked', () => {
    const mockOnNextPageClick = vi.fn();
    const mockOnPrevPageClick = vi.fn();

    render(
      <Pagination
        onNextPageClick={mockOnNextPageClick}
        onPrevPageClick={mockOnPrevPageClick}
        disable={{ left: false, right: false }}
        nav={{ current: 1, total: 5 }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '>' }));
    expect(mockOnNextPageClick).toHaveBeenCalledTimes(1);
  });

  it('should call onPrevPageClick when Previous button is clicked', () => {
    const mockOnNextPageClick = vi.fn();
    const mockOnPrevPageClick = vi.fn();

    render(
      <Pagination
        onNextPageClick={mockOnNextPageClick}
        onPrevPageClick={mockOnPrevPageClick}
        disable={{ left: false, right: false }}
        nav={{ current: 2, total: 5 }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '<' }));
    expect(mockOnPrevPageClick).toHaveBeenCalledTimes(1);
  });

  it('should disable Previous button when disabled', () => {
    render(
      <Pagination
        onNextPageClick={() => {}}
        onPrevPageClick={() => {}}
        disable={{ left: true, right: false }}
        nav={{ current: 1, total: 5 }}
      />
    );

    const prevButton = screen.getByRole('button', { name: '<' });
    expect(prevButton).toBeDisabled();
  });

  it('should disable Next button when disabled', () => {
    render(
      <Pagination
        onNextPageClick={() => {}}
        onPrevPageClick={() => {}}
        disable={{ left: false, right: true }}
        nav={{ current: 1, total: 5 }}
      />
    );

    const nextButton = screen.getByRole('button', { name: '>' });
    expect(nextButton).toBeDisabled();
  });
});
