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
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0px 20px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledWelcome = styled.div`
  margin-right: 8px;
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
    <StyledNav>
      <h1>chatrbox</h1>
      {isAuthenticated && (
        <RightContainer>
          <StyledWelcome>
            <p>Welcome {username}</p>
          </StyledWelcome>
          <Button onClick={handleLogout}>Log Out</Button>
        </RightContainer>
      )}
    </StyledNav>
  );
};

export default NavBar;
