import React, { ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../interfaces';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>OOPS...Seems like an error occured!</p>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
