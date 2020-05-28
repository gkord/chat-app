import { setCurrentUser, logoutUser } from '../store/slice';
import { setAuthToken } from './setAuthToken';
import jwt_decode from 'jwt-decode';

const checkAuth = (store) => {
  // if there's already a token, get and set token
  if (localStorage.token) {
    const token = localStorage.token;
    setAuthToken(token);
    // decode token and set user and isAuthenticated
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded.user));

    // if token is expired, logout user and redirect
    if (decoded.exp < Date.now() / 1000) {
      store.dispatch(logoutUser());
      window.location = '/login';
    }
  }
};

export default checkAuth;
