import React from 'react';
import styled from 'styled-components';
import Button from '../components/elements/Button';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
`;

const StyledTitle = styled.h2`
  font-size: 42px;
  margin-bottom: 12px;
  position: relative;
  &::after {
    background-color: rgba(40, 167, 69, 0.8);
    content: '';
    display: block;
    height: 8px;
    position: absolute;
    width: 100%;
    top: 29px;
    z-index: -1;
  }
`;

const LandingPage = ({ history }) => {
  return (
    <LandingContainer>
      <StyledTitle>chatrbox</StyledTitle>
      <p>Real-time online chat application for you and your friends</p>
      <ButtonContainer>
        <Button onClick={() => history.push('/register')}>Sign Up</Button>
        <Button onClick={() => history.push('/login')}>Login</Button>
      </ButtonContainer>
    </LandingContainer>
  );
};

export default LandingPage;
