import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MainNav from './MainNav';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colorMain};
  display: grid;
  grid-template-columns: auto 1fr;
`;
const Logo = styled(Link)`
  background-color: ${({ theme }) => theme.logoBackground};
  border-radius: 1.5rem 5rem;
  color: ${({ theme }) => theme.colorWhite};
  font-family: 'Courgette', cursive;
  letter-spacing: 2px;
  margin-left: 1rem;
  padding: 0.5rem 2.5rem;
`;

const Header = () => (
  <StyledHeader>
    <h1>
      <Logo to="/">Easy Event</Logo>
    </h1>
    <MainNav />
  </StyledHeader>
);

export default Header;
