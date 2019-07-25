import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  height: 100vh;
  position: relative;
  width: 100vw;
`;

const StyledLoader = styled.img`
  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0);
    }

    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  animation: spin 0.8s infinite;
  height: 10rem;
  left: 50%;
  position: absolute;
  top: 50%;
  width: 10rem;
`;
const Loader = () => (
  <LoaderContainer>
    <StyledLoader src="/img/loader.svg" alt="loading..." />
  </LoaderContainer>
);

export default Loader;
