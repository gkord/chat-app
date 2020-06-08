import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import io from 'socket.io-client';
import Button from '../elements/Button';

const socket = io.connect('http://localhost:5000');

const StyledForm = styled.form`
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.28);
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.41),
    0 1px 1px rgba(255, 255, 255, 0.38);
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const ChatInput = ({ username, userId }) => {
  const [message, setMessage] = useState('');

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit('Sent Message', {
      userId,
      username,
      message,
    });
    setMessage('');
  };

  return (
    <StyledForm onSubmit={handleMessageSubmit}>
      <StyledInput
        type='text'
        name='message'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        label='Message'
        placeholder={`${username} says...`}
      />
      <Button disabled={!message}>Send</Button>
    </StyledForm>
  );
};

ChatInput.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
};

export default ChatInput;
