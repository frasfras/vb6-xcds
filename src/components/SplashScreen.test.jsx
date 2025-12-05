import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import SplashScreen from './SplashScreen';

// Helper to wrap component with theme
const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={original}>
      {component}
    </ThemeProvider>
  );
};

describe('SplashScreen Component', () => {
  test('renders with default props', () => {
    renderWithTheme(<SplashScreen />);
    
    expect(screen.getByText('Application')).toBeInTheDocument();
    expect(screen.getByText('Version 1.0.0')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders with custom appName and version', () => {
    renderWithTheme(
      <SplashScreen appName="VB6 Designer" version="0.1.0" />
    );
    
    expect(screen.getByText('VB6 Designer')).toBeInTheDocument();
    expect(screen.getByText('Version 0.1.0')).toBeInTheDocument();
  });

  test('shows loading indicator when isLoading is true', () => {
    renderWithTheme(<SplashScreen isLoading={true} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('hides loading indicator when isLoading is false', () => {
    renderWithTheme(<SplashScreen isLoading={false} />);
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('displays branding information', () => {
    const appName = 'Test App';
    const version = '2.0.0';
    
    renderWithTheme(
      <SplashScreen appName={appName} version={version} />
    );
    
    expect(screen.getByText(appName)).toBeInTheDocument();
    expect(screen.getByText(`Version ${version}`)).toBeInTheDocument();
  });
});
