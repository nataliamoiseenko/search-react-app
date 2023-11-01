import React, { ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  isError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { isError: false };
  }

  componentDidCatch(error: Error, ErrorInfo: React.ErrorInfo): void {
    this.setState({ isError: true });
    console.error('ErrorBoundary caught the error:', error, ErrorInfo);
  }

  render() {
    return (
      <>
        {this.state.isError ? (
          <p>Something went wrong, please reload the page</p>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}

export default ErrorBoundary;
