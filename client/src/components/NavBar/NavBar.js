import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  logoutUser,
  selectAuthenticated,
  selectUsername,
} from '../../store/slice';
import Button from '../elements/Button';

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

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
    <>
      {isAuthenticated && (
        <StyledNav>
          <div>Welcome {username}</div>
          <Button onClick={handleLogout}>Log Out</Button>
        </StyledNav>
      )}
    </>
  );
};

export default NavBar;
