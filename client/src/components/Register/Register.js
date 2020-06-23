import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectError, clearErrors } from '../../store/slice';
import Button from '../elements/Button';
import ErrorMessage from '../elements/ErrorMessage';
import { StyledForm, StyledInput } from '../Login/Login';

const RegisterContainer = styled.div`
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const error = useSelector(selectError);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    dispatch(registerUser(newUser));
  };

  return (
    <RegisterContainer>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <StyledInput
          type='text'
          placeholder='Username'
          name={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type='submit' disabled={!name || !email || !password}>
          Submit
        </Button>
      </StyledForm>
      <p>
        Alreay have an account?{' '}
        <Link to='/login' onClick={() => dispatch(clearErrors())}>
          Click here to login
        </Link>
      </p>
    </RegisterContainer>
  );
};

export default Register;
