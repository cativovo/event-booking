import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import authContext from '../context/authContext';

const PublicRoute = ({ component: Component, location, ...props }) => {
  const { isAuthenticated } = useContext(authContext);

  return (
    <Route
      render={(routeProps) => {
        if (location.pathname === '/login' && isAuthenticated) {
          return <Redirect to="/" />;
        }

        const allProps = { ...routeProps, ...props };

        return (
          <>
            <Header />
            <Component {...allProps} />
          </>
        );
      }}
    />
  );
};

PublicRoute.defaultProps = {
  location: {},
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object),
};

export default PublicRoute;
