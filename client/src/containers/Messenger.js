import React, { useEffect } from 'react';
import styled from 'styled-components';
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

const MessengerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

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
      dispatch(addChats(dbPayload));
    });
  }, [dispatch]);

  return (
    <MessengerContainer>
      <ThreadView chatData={chatData} currentUser={username} />
      <ChatInput username={username} userId={userId} />
    </MessengerContainer>
  );
};

export default Messenger;
