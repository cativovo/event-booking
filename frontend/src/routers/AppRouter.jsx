import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from '../components/Loader';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AsyncLogin = Loadable({
  loader: () => import('../pages/Login'),
  loading: Loader,
});

const AsyncEvent = Loadable({
  loader: () => import('../pages/Event'),
  loading: Loader,
});

const AsyncBooking = Loadable({
  loader: () => import('../pages/Booking'),
  loading: Loader,
});

const AsyncNotFound = Loadable({
  loader: () => import('../pages/NotFound'),
  loading: Loader,
});

const AppRouter = () => (
  <Router>
    <Switch>
      <PrivateRoute path="/booking" component={AsyncBooking} />
      <PublicRoute path="/login" component={AsyncLogin} />
      <PublicRoute path="/" exact component={AsyncEvent} />
      <PublicRoute component={AsyncNotFound} />
    </Switch>
  </Router>
);

export { AppRouter as default };
