import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import authContext from './authContext';
import Loader from '../components/Loader';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticating, setisAuthenticating] = useState(true);

  const setTokenAndUserId = (tokenToStore, userIdToStore) => {
    setToken(tokenToStore);
    setUserId(userIdToStore);
  };

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    const localStorageUserId = localStorage.getItem('userId');

    if (localStorageToken && localStorageUserId) {
      setTokenAndUserId(localStorageToken, localStorageUserId);
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
        userId,
        setTokenAndUserId,
        isAuthenticating,
        isAuthenticated: token && userId,
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
