import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import HeadingPrimary from '../styles/HeadingPrimary';
import query from '../utils/query';
import InputGroup from '../styles/InputGroup';
import StyledForm from '../styles/StyledForm';
import ButtonWithSpinner from '../components/ButtonWithSpinner';
import Message from '../styles/MessageContainer';
import authContext from '../context/authContext';

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

    button {
      margin: 0 auto;
      margin-top: 2rem;
    }
  }
`;

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setTokenAndUserId } = useContext(authContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsAuthenticating(true);
    const {
      email: { value: email },
      password: { value: password },
    } = e.target;

    const response = await query(`
      query{
          login(email:"${email}", password:"${password}") {
              token
              userId
          }
      }
    `);

    const { errors, data } = response;
    setIsAuthenticating(false);

    if (errors) {
      setErrorMessage(errors[0].message);
      return;
    }

    const { token, userId } = data.login;
    setTokenAndUserId(token, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  };

  return (
    <StyledLogin>
      <div className="login-box">
        <HeadingPrimary>Login</HeadingPrimary>
        <StyledForm onSubmit={handleSubmit}>
          <InputGroup>
            <input type="text" name="email" id="email" placeholder="Email" />
            <label htmlFor="email">Email</label>
          </InputGroup>
          <InputGroup>
            <input type="password" name="password" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </InputGroup>
          <ButtonWithSpinner type="submit" buttonText="Login" isLoading={isAuthenticating} />
        </StyledForm>
        <Message>
          {isAuthenticating ? (
            <span className="auth">Logging in...</span>
          ) : (
            errorMessage && <span className="error">{errorMessage}</span>
          )}
        </Message>
      </div>
    </StyledLogin>
  );
};

export default Login;
