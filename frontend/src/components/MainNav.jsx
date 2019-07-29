import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import authContext from '../context/authContext';
import query from '../utils/query';

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-right: 10rem;

  button {
    background-color: transparent;
    border: none;
    outline: none;
  }

  a,
  button {
    align-items: center;
    color: ${({ theme }) => theme.colorWhite};
    display: flex;
    font-size: 2rem;
    font-weight: 800;
    height: 100%;
    padding-left: 2rem;
    position: relative;

    &:not(:last-child) {
      margin-right: 2rem;
    }

    &::before {
      background-color: ${({ theme }) => theme.colorSecondary};
      content: '';
      left: 0rem;
      height: 100%;
      position: absolute;
      top: 0;
      transform: skew(-10deg);
      width: 2px;
    }

    &::after {
      background-color: ${({ theme }) => theme.colorSecondary};
      bottom: calc(2rem - 0.5rem);
      content: '';
      left: 65%;
      height: 2px;
      position: absolute;
      transform: translateX(-50%);
      transition: 0.4s width cubic-bezier(1, -0.65, 0, 2.31);
      width: 0;
    }

    &:hover::after {
      width: calc(100% - 2rem);
    }

    &.active {
      color: ${({ theme }) => theme.logoBackground};
      &::after {
        background-color: ${({ theme }) => theme.logoBackground};
      }
    }
  }
`;

const MainNav = () => {
  const { setTokenAndUserId, isAuthenticated, token } = useContext(authContext);

  return (
    <StyledNav>
      <NavLink to="/" exact>
        Events
      </NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/booking">Booking</NavLink>
          <button
            type="button"
            onClick={() => {
              setTokenAndUserId(null, null);
              localStorage.removeItem('token');
              localStorage.removeItem('userId');

              query(
                `
                mutation {
                  logout {
                    result
                  }
                }
              `,
                undefined,
                token,
              );
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </StyledNav>
  );
};

export default MainNav;
