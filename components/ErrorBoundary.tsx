import React, { ErrorInfo } from 'react';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../interfaces/interfaces';

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
      return (
        <div className="app">
          <header className="header">
            <h1>Star Wars People Finders</h1>
          </header>
          <main className="main">
            <p>OOPS...Seems like an error occured!</p>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
