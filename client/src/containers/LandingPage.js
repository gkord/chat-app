import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LandingContainer = styled.div`
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const LandingPage = () => {
  return (
    <LandingContainer>
      <h2>chatrbox</h2>
      <Link to='/register'>Click here to sign up</Link>
      <p>
        Already have an account? <Link to='/login'>Click here to sign in</Link>
      </p>
    </LandingContainer>
  );
};

export default LandingPage;
