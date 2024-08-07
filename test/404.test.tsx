import React from 'react';
import { render, screen } from '@testing-library/react';

import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import ErrorPage from '../pages/404';

describe('ErrorPage', () => {
  it('renders correctly', () => {
    render(<ErrorPage />);

    const heading = screen.getByRole('heading', { name: /oops!/i });
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(
      /sorry, an unexpected error has occurred./i
    );
    expect(paragraph).toBeInTheDocument();
  });
});
