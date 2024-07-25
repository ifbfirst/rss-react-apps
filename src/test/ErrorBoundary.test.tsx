import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>Everything is fine!</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('Everything is fine!')).toBeInTheDocument();
  });

  it('catches errors and renders fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('OOPS...Seems like an error occured!')
    ).toBeInTheDocument();
  });

  it('logs error information', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
