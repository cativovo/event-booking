import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import authContext from '../context/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { token } = useContext(authContext);

  return (
    <Route
      render={(routeProps) => {
        if (!token) {
          return <Redirect to="/login" />;
        }

        const allProps = { ...routeProps, ...props };

        return (
          <>
            <Header />
            <Component {...allProps} />
          </>
        );
      }}
      {...props}
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
