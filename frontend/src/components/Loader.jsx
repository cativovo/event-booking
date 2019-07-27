import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoaderContainer = styled.div`
  height: ${({ children: { props: fullScreen } }) => (fullScreen ? '100vh' : '100%')};
  position: ${({ children: { props: fullScreen } }) => (fullScreen ? 'fixed' : 'relative')};
  top: 0;
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
const Loader = ({ fullScreen }) => (
  <LoaderContainer>
    <StyledLoader fullScreen={fullScreen} src="/img/loader.svg" alt="loading..." />
  </LoaderContainer>
);

export default Loader;

Loader.defaultProps = {
  fullScreen: true,
};

Loader.propTypes = {
  fullScreen: PropTypes.bool,
};
