import styled from 'styled-components';

const Message = styled.p`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;

  .error {
    color: ${({ theme }) => theme.colorDanger};
  }
`;

export default Message;
