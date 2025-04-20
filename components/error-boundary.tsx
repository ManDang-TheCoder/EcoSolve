'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
              <p className="text-red-700 text-sm font-mono overflow-auto">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 