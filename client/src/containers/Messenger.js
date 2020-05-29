import React, { useEffect } from 'react';
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
} from '../store/slice';
import ChatInput from '../components/ChatInput';
import ThreadView from '../components/ThreadView';

const socket = io.connect('http://localhost:5000');

const Messenger = () => {
  const dispatch = useDispatch();

  // State
  const username = useSelector(selectUsername);
  const userId = useSelector(selectUserId);
  const chatData = useSelector(selectChat);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        dispatch(setFetching(true));
        const { data } = await axios.get('http://localhost:5000/chat/chats');
        dispatch(getChats(data));
        dispatch(setFetching(false));
      } catch (err) {
        console.log(err);
      }
    };
    fetchChats();
    socket.on('Received Message', (dbPayload) => {
      console.log(dbPayload);
      dispatch(addChats(dbPayload));
    });
  }, [dispatch]);

  return (
    <div>
      <ThreadView chatData={chatData} />
      <ChatInput username={username} userId={userId} />
    </div>
  );
};

export default Messenger;
