import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SplashScreen from './SplashScreen';
import SplashScreenErrorBoundary from './SplashScreenErrorBoundary';

const WrapperContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainContent = styled.div`
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 400ms ease-in-out;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`;

/**
 * Validates and normalizes the minDisplayDuration prop
 * @param {*} duration - The duration value to validate
 * @returns {number} - A valid duration between 0 and 30000ms
 */
const validateDuration = (duration) => {
  // Handle non-numeric values
  if (typeof duration !== 'number' || isNaN(duration)) {
    return 2000; // Default to 2000ms
  }
  
  // Handle negative or zero values
  if (duration <= 0) {
    return 2000; // Default to 2000ms
  }
  
  // Cap excessive values at 30 seconds
  if (duration > 30000) {
    return 30000;
  }
  
  return duration;
};

/**
 * Validates and normalizes branding props
 * @param {string} value - The branding value to validate
 * @param {string} defaultValue - The default value to use if invalid
 * @returns {string} - A valid non-empty string
 */
const validateBrandingProp = (value, defaultValue) => {
  // Handle undefined, null, or empty strings
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return defaultValue;
  }
  return value;
};

const SplashScreenWrapper = ({ 
  minDisplayDuration = 2000, 
  appName = 'Application',
  version = '1.0.0',
  children 
}) => {
  // Validate configuration props
  const validatedDuration = validateDuration(minDisplayDuration);
  const validatedAppName = validateBrandingProp(appName, 'Application');
  const validatedVersion = validateBrandingProp(version, '1.0.0');
  
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [startTime] = useState(() => Date.now());

  // Timing coordination logic
  useEffect(() => {
    // Simulate application loading completion
    // In a real app, this would be triggered by actual resource loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Simulate quick load

    return () => clearTimeout(loadTimer);
  }, []);

  // Handle splash dismissal when both conditions are met
  useEffect(() => {
    if (!isLoading) {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, validatedDuration - elapsed);

      const dismissTimer = setTimeout(() => {
        setShowSplash(false);
      }, remainingTime);

      return () => clearTimeout(dismissTimer);
    }
  }, [isLoading, startTime, validatedDuration]);

  return (
    <SplashScreenErrorBoundary>
      <WrapperContainer>
        {showSplash && (
          <SplashScreen 
            appName={validatedAppName}
            version={validatedVersion}
            isLoading={isLoading}
          />
        )}
        <MainContent visible={!showSplash}>
          {children}
        </MainContent>
      </WrapperContainer>
    </SplashScreenErrorBoundary>
  );
};

export default SplashScreenWrapper;
