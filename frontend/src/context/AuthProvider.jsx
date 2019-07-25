import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import authContext from './authContext';
import Loader from '../components/Loader';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticating, setisAuthenticating] = useState(true);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');

    if (localStorageToken) {
      setToken(localStorageToken);
    }

    setisAuthenticating(false);
  }, []);

  if (isAuthenticating) {
    return <Loader />;
  }

  return (
    <authContext.Provider
      value={{
        token,
        setToken,
        isAuthenticating,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
