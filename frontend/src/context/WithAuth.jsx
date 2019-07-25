import React from 'react';
import authContext from './authContext';

const WithAuth = function WithAuth(Component) {
  return props => (
    <authContext.Consumer>
      {(providerProps) => {
        const newProps = { ...props, ...providerProps };
        return <Component {...newProps} />;
      }}
    </authContext.Consumer>
  );
};

export default WithAuth;
