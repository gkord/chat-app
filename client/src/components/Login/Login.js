import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectError, selectAuthenticated } from '../../store/slice';
import Button from '../elements/Button';

const LoginContainer = styled.div`
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form`
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const StyledInput = styled.input`
  border: 1px solid lightgray;
  display: inline-block;
  padding: 10px 15px;
  border-radius: 4px;
  min-height: 23px;
  -webkit-appearance: none;
  margin-right: 8px;
`;

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectAuthenticated);

  useEffect(() => {
    //if user already authenticated send to homepage
    if (isAuthenticated) history.push('/messenger');
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(loginUser(data));
    setEmail('');
    setPassword('');
  };

  return (
    <LoginContainer>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <StyledInput
          type='text'
          placeholder='Email'
          name={email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          type='password'
          placeholder='Password'
          name={password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' disabled={!email || !password}>
          Log In
        </Button>
        <pre>{error}</pre>
      </StyledForm>
      <p>
        Don't have an account? <Link to='/register'>Click here to sign up</Link>
      </p>
    </LoginContainer>
  );
};

export default Login;
