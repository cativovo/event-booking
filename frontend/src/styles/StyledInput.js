import styled from 'styled-components';

const StyledInput = styled.input`
  border: none;
  border-radius: 3px;
  font-size: 1.8rem;
  padding: 1rem;
  outline: none;

  &:focus {
    box-shadow: ${({ theme }) => `0 0 1rem 3px ${theme.logoBackground}`};
  }
`;

export default StyledInput;
