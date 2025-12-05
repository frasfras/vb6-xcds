import React from 'react';
import { Window, WindowContent } from 'react95';
import styled from 'styled-components';

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #008080;
  z-index: 9999;
`;

const SplashWindow = styled(Window)`
  width: 400px;
  min-height: 250px;
  font-family: 'ms_sans_serif', sans-serif;
`;

const SplashContent = styled(WindowContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const AppTitle = styled.h1`
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #000080;
  text-shadow: 1px 1px 0px #ffffff;
`;

const VersionText = styled.p`
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 14px;
  margin: 0 0 30px 0;
  color: #000000;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const LoadingDot = styled.span`
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: #000080;
  border-radius: 50%;
  display: inline-block;
  animation: loading 1.4s infinite ease-in-out both;
  animation-delay: ${props => props.delay || '0s'};

  @keyframes loading {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const LoadingText = styled.p`
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 12px;
  margin: 10px 0 0 0;
  color: #000000;
`;

const SplashScreen = ({ appName = 'Application', version = '1.0.0', isLoading = true }) => {
  return (
    <SplashContainer>
      <SplashWindow>
        <SplashContent>
          <AppTitle>{appName}</AppTitle>
          <VersionText>Version {version}</VersionText>
          
          {isLoading && (
            <>
              <LoadingContainer>
                <LoadingDot delay="0s" />
                <LoadingDot delay="0.2s" />
                <LoadingDot delay="0.4s" />
              </LoadingContainer>
              <LoadingText>Loading...</LoadingText>
            </>
          )}
        </SplashContent>
      </SplashWindow>
    </SplashContainer>
  );
};

export default SplashScreen;
