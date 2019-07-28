import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../styles/StyledButton';
import { EcplipseSpinner } from './Loader';

const ButtonInner = styled.div`
  position: relative;
`;

const LoaderContainer = styled.div`
  position: absolute;
  left: -155%;
  top: -2.3rem;
  transform: scale(0.15);
`;

const blank = <span>&nbsp; &nbsp; &nbsp; &nbsp;</span>;

const ButtonWithSpinner = ({ buttonText, isLoading, ...rest }) => (
  <StyledButton disabled={isLoading} {...rest}>
    <ButtonInner>
      {isLoading ? blank : buttonText}
      {isLoading && (
        <LoaderContainer>
          <EcplipseSpinner speed={0.2} />
        </LoaderContainer>
      )}
    </ButtonInner>
  </StyledButton>
);

export default ButtonWithSpinner;

ButtonWithSpinner.propTypes = {
  buttonText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
