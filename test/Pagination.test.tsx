import Pagination from '../components/Pagination';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const mockNextPageClick = vi.fn();
  const mockPrevPageClick = vi.fn();

  it('renders correctly with navigation', () => {
    render(
      <Pagination
        onNextPageClick={mockNextPageClick}
        onPrevPageClick={mockPrevPageClick}
        disable={{ left: false, right: false }}
        nav={{ current: 1, total: 5 }}
      />
    );

    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('calls onNextPageClick when the next button is clicked', () => {
    render(
      <Pagination
        onNextPageClick={mockNextPageClick}
        onPrevPageClick={mockPrevPageClick}
        disable={{ left: false, right: false }}
        nav={{ current: 2, total: 5 }}
      />
    );

    fireEvent.click(screen.getByText('>'));
    expect(mockNextPageClick).toHaveBeenCalledTimes(1);
  });

  it('calls onPrevPageClick when the previous button is clicked', () => {
    render(
      <Pagination
        onNextPageClick={mockNextPageClick}
        onPrevPageClick={mockPrevPageClick}
        disable={{ left: false, right: false }}
        nav={{ current: 2, total: 5 }}
      />
    );

    fireEvent.click(screen.getByText('<'));
    expect(mockPrevPageClick).toHaveBeenCalledTimes(1);
  });

  it('disables the prev button when the left is disabled', () => {
    render(
      <Pagination
        onNextPageClick={mockNextPageClick}
        onPrevPageClick={mockPrevPageClick}
        disable={{ left: true, right: false }}
        nav={{ current: 2, total: 5 }}
      />
    );

    const previousButton = screen.getByText('<');
    expect(previousButton).toBeDisabled();
  });

  it('disables the next button when the right is disabled', () => {
    render(
      <Pagination
        onNextPageClick={mockNextPageClick}
        onPrevPageClick={mockPrevPageClick}
        disable={{ left: false, right: true }}
        nav={{ current: 2, total: 5 }}
      />
    );

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });
});
