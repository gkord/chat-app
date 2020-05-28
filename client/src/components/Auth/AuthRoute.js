import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthenticated } from '../../store/slice';

// Find the component property defined on props (Note: lowercase component) and assign it to a new location in state we call Component (Note: capital Component).
// Then, take all remaining properties defined on the props object and collect them inside an argument called rest.

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(selectAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
