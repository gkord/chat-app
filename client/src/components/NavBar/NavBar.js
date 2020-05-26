import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, selectAuthenticated, selectUser } from '../../store/slice';

const NavBar = () => {
  const dispatch = useDispatch();
  console.log('hello');
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location = '/login';
  };

  return (
    <nav>
      {isAuthenticated && (
        <>
          <div>Welcome {user}</div>
          <button onClick={handleLogout}>Log Out</button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
