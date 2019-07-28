import React from 'react';
import styled from 'styled-components';

const EcplipseSpinner = styled.div`
  @keyframes lds-eclipse {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  animation: lds-eclipse ${({ speed }) => speed || 0.5}s linear infinite;
  border-radius: 50%;
  box-shadow: 0 4px 0 0 ${({ theme }) => theme.colorMain};
  height: 160px;
  margin-top: -80px;
  transform-origin: 80px 82px;
  width: 160px;
`;

const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  height: 100vh;
  top: 0;
  width: 100vw;
  z-index: 999999;
`;

const Loader = () => (
  <LoaderContainer>
    <EcplipseSpinner />
  </LoaderContainer>
);

export { Loader as default, EcplipseSpinner };
