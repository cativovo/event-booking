import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import WithAuth from '../context/WithAuth';
import HeadingPrimary from '../styles/HeadingPrimary';
import query from '../utils/query';
import InputGroup from '../styles/InputGroup';
import StyledForm from '../styles/StyledForm';
import StyledButton from '../styles/StyledButton';
import Message from '../styles/MessageContainer';

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

    query(`
      query{
          login(email:"${email}", password:"${password}") {
              token
              userId
          }
      }
    `).then((res) => {
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
        <StyledForm onSubmit={handleSubmit}>
          <InputGroup>
            <input type="text" name="email" id="email" placeholder="Email" />
            <label htmlFor="email">Email</label>
          </InputGroup>
          <InputGroup>
            <input type="password" name="password" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </InputGroup>
          {!isAuthenticating && <StyledButton type="submit">Login</StyledButton>}
        </StyledForm>
        <Message>
          {isAuthenticating ? (
            <span className="auth">Authenticating</span>
          ) : (
            errorMessage && <span className="error">{errorMessage}</span>
          )}
        </Message>
      </div>
    </StyledLogin>
  );
};

export default WithAuth(Login);

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
