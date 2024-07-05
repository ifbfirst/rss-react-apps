import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  hasError: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  render() {
    if (this.props.hasError) {
      return <p>OOPS...Seems like an error occured!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
