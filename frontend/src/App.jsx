import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import AuthProvider from './context/AuthProvider';
import AppRouter from './routers/AppRouter';

const theme = {
  colorMain: '#00b894',
  colorSecondary: '#7DFFE5',
  colorBlack: '#2d3436',
  colorWhite: '#fff',
  colorDanger: '#c23616',
  logoBackground: '#B35634',
};

const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css?family=Courgette&display=swap');

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    color: ${theme.colorBlack};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    line-height: 2;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <AppRouter />
      </>
    </ThemeProvider>
  </AuthProvider>
);
export default App;
