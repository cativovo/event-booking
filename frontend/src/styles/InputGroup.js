import styled from 'styled-components';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 0 auto;
  width: 70%;

  label {
    font-weight: 600;
    margin-top: 0.5rem;
    transition: 0.5s all;
  }

  input + label,
  textarea + label {
    opacity: 0;
  }

  input[type='date'] {
    &::before {
      content: 'Date';
      color: #aaa;
      margin-right: 0.8rem;
      transition: 0.1s all;
    }

    &:focus::before {
      content: '';
      margin: 0;
    }

    &:focus + label {
      opacity: 1;
    }
  }

  input:not([type='date']):not(:placeholder-shown) + label,
  textarea:not(:placeholder-shown) + label {
    opacity: 1;
  }
`;

export default InputGroup;
