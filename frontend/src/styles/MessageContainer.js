import styled from 'styled-components';

const Message = styled.p`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;

  .error {
    color: ${({ theme }) => theme.colorDanger};
  }

  .auth {
    display: inline-block;
    margin-top: 2rem;

    @keyframes authenticating {
      0% {
        content: '';
      }

      80% {
        content: '.';
      }

      90% {
        content: '..';
      }

      100% {
        content: '...';
      }
    }

    &::after {
      animation: authenticating 1.5s infinite linear;
      content: '';
    }
  }
`;

export default Message;
