import { setCurrentUser, logoutUser } from '../store/slice';
import { setAuthToken } from './setAuthToken';
import jwt_decode from 'jwt-decode';

const checkAuth = (store) => {
  if (localStorage.token) {
    const token = localStorage.token;
    setAuthToken(token);
    const decoded = jwt_decode(token);

    store.dispatch(setCurrentUser(decoded.user));
  }
};

export default checkAuth;
