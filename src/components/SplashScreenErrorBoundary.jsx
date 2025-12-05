import React from 'react';

/**
 * Error Boundary component for the Splash Screen
 * If the splash screen fails to render, this will catch the error
 * and render the children (main app) directly as a fallback
 */
class SplashScreenErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging purposes
    console.error('Splash Screen Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback: render children directly without splash screen
      return this.props.children;
    }

    return this.props.children;
  }
}

export default SplashScreenErrorBoundary;
