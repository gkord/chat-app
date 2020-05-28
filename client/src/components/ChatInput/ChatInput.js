import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUsername,
  selectUserId,
  selectChat,
  getChats,
  addChats,
  setFetching,
} from '../../store/slice';

const socket = io.connect('http://localhost:5000');

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  // State
  const username = useSelector(selectUsername);
  const userId = useSelector(selectUserId);
  const chatData = useSelector(selectChat);

  const fetchChats = async () => {
    try {
      dispatch(setFetching(true));
      const { data } = await axios.get('http://localhost:5000/chat/chats');
      console.log(data);
      dispatch(getChats(data));
      dispatch(setFetching(false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(chatData);
    fetchChats();
    socket.on('Received Message', (dbPayload) => {
      console.log(dbPayload);
      dispatch(addChats(dbPayload));
    });
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit('Sent Message', {
      userId,
      username,
      message,
    });
    setMessage('');
  };

  const renderChat = () => {
    return (
      <div>
        {chatData.map((chat, i) => (
          <h3 key={i}>
            {username}: {chat.message}
          </h3>
        ))}
      </div>
    );
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
      <div className='render-chat'>
        <h2>Chat Log</h2>
        {renderChat()}
      </div>
    </div>
  );
};

export default ChatInput;
