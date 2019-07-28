import styled from 'styled-components';
import { lighten, saturate } from 'polished';

const StyledButton = styled.button`
  background-color: ${({ theme, danger, primary }) => {
    if (danger) {
      return theme.colorDanger;
    }

    if (primary) {
      return theme.colorTertiary;
    }

    return theme.logoBackground;
  }};

  border: none;
  border-radius: 3px;
  color: ${({ theme }) => theme.colorWhite};
  display: block;
  font-size: 2rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: 0.3s background-color;

  &:disabled {
    background-color: ${({ theme, danger, primary }) => {
    const lightenPercentage = 0.2;

    if (danger) {
      return lighten(lightenPercentage, theme.colorDanger);
    }

    if (primary) {
      return lighten(lightenPercentage, theme.colorTertiary);
    }

    return lighten(lightenPercentage, theme.logoBackground);
  }};
  }

  &:hover {
    background-color: ${({ theme, danger, primary }) => {
    const saturatePercentage = 0.1;

    if (danger) {
      return saturate(saturatePercentage, theme.colorDanger);
    }

    if (primary) {
      return saturate(saturatePercentage, theme.colorTertiary);
    }

    return saturate(saturatePercentage, theme.logoBackground);
  }};
  }
`;

export default StyledButton;
