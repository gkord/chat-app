import React, { useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

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
    <div className='card'>
      <form onSubmit={handleMessageSubmit}>
        <h2>Messenger</h2>
        <div>
          <p>{username}</p>
          <input
            type='text'
            name='message'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            label='Message'
          />
        </div>
        <button disabled={!message}>Send Message</button>
      </form>
    </div>
  );
};

ChatInput.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
};

export default ChatInput;
