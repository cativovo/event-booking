/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import WithAuth from '../context/WithAuth';
import HeadingPrimary from '../styles/HeadingPrimary';
import StyledInput from '../styles/StyledInput';

const StyledLogin = styled.div`
  position: relative;

  .login-box {
    background-color: ${({ theme }) => theme.colorSecondary};
    left: 50%;
    height: 50vh;
    position: absolute;
    top: 8rem;
    transform: translateX(-50%);
    width: 30vw;

    p {
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
    }

    button {
      margin: 0 auto;
      margin-top: 2rem;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 0 auto;
  width: 70%;

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    opacity: 0;
    transition: 0.5s all;
  }

  input:not(:placeholder-shown) + label {
    opacity: 1;
  }
`;

const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.logoBackground};
  border: none;
  border-radius: 3px;
  color: ${({ theme }) => theme.colorWhite};
  display: block;
  font-size: 2rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: 0.3s opacity;

  &:hover {
    opacity: 0.9;
  }
`;

const Login = ({ setToken }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsAuthenticating(true);
    const {
      email: { value: email },
      password: { value: password },
    } = e.target;
    const body = JSON.stringify({
      query: `
              query{
                  login(email:"${email}", password:"${password}") {
                      token
                      userId
                  }
              }
          `,
    });

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        const { errors, data } = res;
        setIsAuthenticating(false);

        if (errors) {
          setErrorMessage(errors[0].message);
          return;
        }

        const { token } = data.login;
        setToken(token);
        localStorage.setItem('token', token);
      });
  };

  return (
    <StyledLogin>
      <div className="login-box">
        <HeadingPrimary>Login</HeadingPrimary>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <StyledInput type="text" name="email" id="email" placeholder="Email" />
            <label htmlFor="email">Email</label>
          </FormGroup>
          <FormGroup>
            <StyledInput type="password" name="password" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </FormGroup>
          {!isAuthenticating && <LoginButton type="submit">Login</LoginButton>}
        </form>
        <p>
          {isAuthenticating ? (
            <span className="auth">Authenticating</span>
          ) : (
            errorMessage && <span className="error">{errorMessage}</span>
          )}
        </p>
      </div>
    </StyledLogin>
  );
};

export default WithAuth(Login);

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
