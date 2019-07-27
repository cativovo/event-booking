import styled from 'styled-components';

const StyledForm = styled.form`
  .form-group {
    background-color: ${({ theme }) => theme.colorMain};
    padding: 0.5rem 0 2rem 0;
  }

  input,
  textarea {
    border: none;
    border-radius: 3px;
    font-family: inherit;
    font-size: 1.8rem;
    outline: none;
    padding: 1rem;

    &:focus {
      box-shadow: ${({ theme }) => `0 0 1rem 3px ${theme.logoBackground}`};
    }
  }
`;

export default StyledForm;
