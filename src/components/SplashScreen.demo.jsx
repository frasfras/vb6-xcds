import React from 'react';
import { ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import { createGlobalStyle } from 'styled-components';
import original from 'react95/dist/themes/original';
import SplashScreen from './SplashScreen';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

/**
 * Demo component to visually test the SplashScreen
 * This can be temporarily added to App.js for visual verification
 */
const SplashScreenDemo = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <SplashScreen 
          appName="VB6 Designer" 
          version="0.1.0" 
          isLoading={true} 
        />
      </ThemeProvider>
    </>
  );
};

export default SplashScreenDemo;
