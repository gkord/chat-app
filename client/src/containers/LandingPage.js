import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <p>Chat App</p>
      <Link to='/register'>Click here to sign up</Link>
      <p>Already have an account?</p>
      <Link to='/login'>Click here to sign in</Link>
    </div>
  );
};

export default LandingPage;
