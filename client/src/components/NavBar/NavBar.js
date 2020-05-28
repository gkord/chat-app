import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  logoutUser,
  selectAuthenticated,
  selectUsername,
} from '../../store/slice';
import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();

  // State
  const username = useSelector(selectUsername);
  const isAuthenticated = useSelector(selectAuthenticated);

  //Handlers
  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = '/login';
  };

  return (
    <nav>
      {isAuthenticated && (
        <>
          <div>Welcome {username}</div>
          <button onClick={handleLogout}>Log Out</button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
