import React, { useState } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:5000');

const App = () => {
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
    <div>
      {/* <Router>
        <Route path='/' component={Login} />
        <Route />
        <Route />
      </Router> */}
      <div className='card'>
        <form onSubmit={handleMessageSubmit}>
          <h1>Messenger</h1>
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
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
      </div>
    </div>
  );
};

export default App;
