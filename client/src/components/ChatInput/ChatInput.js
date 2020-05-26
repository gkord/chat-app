import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  // useEffect(() => {});

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', { message });
    setChat([...chat, { message }]);
    setMessage('');
  };

  const renderChat = () => {
    return chat.map(({ message }, index) => {
      return (
        <div key={index}>
          <h3>
            <span>{message}</span>
          </h3>
        </div>
      );
    });
  };
  return (
    <div className='card'>
      <form onSubmit={handleMessageSubmit}>
        <h2>Messenger</h2>
        <div>
          <input
            type='text'
            name='message'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            label='Message'
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className='render-chat'>
        <h2>Chat Log</h2>
        {renderChat()}
      </div>
    </div>
  );
};

export default ChatInput;
