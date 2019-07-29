/* eslint-disable no-throw-literal */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import HeadingPrimary from '../styles/HeadingPrimary';
import query from '../utils/query';
import InputGroup from '../styles/InputGroup';
import StyledForm from '../styles/StyledForm';
import ButtonWithSpinner from '../components/ButtonWithSpinner';
import Message from '../styles/MessageContainer';
import authContext from '../context/authContext';

const StyledBox = styled.div`
  position: relative;

  .inner-box {
    background-color: ${({ theme }) => theme.colorSecondary};
    left: 50%;
    height: auto;
    padding: 2rem 0;
    position: absolute;
    top: 8rem;
    transform: translateX(-50%);
    width: 30vw;

    .login-button,
    .change {
      margin: 0 auto;
      margin-top: 2rem;
    }
  }
`;

const ChangeButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.logoBackground};
  display: block;
  font-size: 2rem;
  outline: none;
  transition: 0.2s box-shadow;

  &:hover {
    box-shadow: inset 0 -1px ${({ theme }) => theme.colorBlack},
      inset 0 -2px ${({ theme }) => theme.colorSecondary},
      inset 0 -3px ${({ theme }) => theme.colorWhite};
  }
`;

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { setTokenAndUserId } = useContext(authContext);

  const handleResponse = ({ errors, data }, resolver) => {
    setIsAuthenticating(false);

    if (errors) {
      throw errors[0].message;
    }

    const { token, userId } = data[resolver];
    setTokenAndUserId(token, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  };

  const handleLogin = async (email, password) => {
    setIsAuthenticating(true);
    try {
      const response = await query(
        `
      query LoginUser($email: String!, $password: String!){
          login(email: $email, password: $password) {
              token
              userId
          }
      }
    `,
        { email, password },
      );

      handleResponse(response, 'login');
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const handleSignup = async (email, password, confirmPassword) => {
    try {
      if (password.trim() !== confirmPassword.trim()) {
        throw "Password doesn't match";
      }

      setIsAuthenticating(true);

      const response = await query(
        `
        mutation CreateUser($email: String!, $password: String!) {
          createUser(userInput: {email: $email, password: $password}) {
            token
            userId
          }
        }
      `,
        { email, password },
      );

      handleResponse(response, 'createUser');
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const {
      email: { value: email },
      password: { value: password },
    } = e.target;

    if (isLogin) {
      handleLogin(email, password);
      return;
    }

    handleSignup(email, password, e.target.confirmPassword.value);
  };

  const handleChange = () => {
    if (errorMessage) {
      setErrorMessage('');
    }
    setIsLogin(!isLogin);
  };

  return (
    <StyledBox>
      <div className="inner-box">
        <HeadingPrimary>Login</HeadingPrimary>
        <StyledForm onSubmit={handleSubmit}>
          <InputGroup>
            <input type="email" name="email" id="email" placeholder="Email" />
            <label htmlFor="email">Email</label>
          </InputGroup>

          <InputGroup>
            <input type="password" name="password" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </InputGroup>

          {!isLogin && (
            <InputGroup>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
              />
              <label htmlFor="confirmPassword">Confirm password</label>
            </InputGroup>
          )}
          <ButtonWithSpinner
            className="login-button"
            type="submit"
            buttonText={!isLogin ? 'Signup' : 'Login'}
            isLoading={isAuthenticating}
          />
          {!isAuthenticating && (
            <ChangeButton className="change" type="button" onClick={handleChange}>
              {isLogin ? 'Signup' : 'Login'}
            </ChangeButton>
          )}
        </StyledForm>
        <Message>
          {isAuthenticating ? (
            <span className="auth">
              {isLogin ? 'Logging in' : 'Creating Account'}
              ...
            </span>
          ) : (
            errorMessage && <span className="error">{errorMessage}</span>
          )}
        </Message>
      </div>
    </StyledBox>
  );
};

export default Login;
