import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MessageBox from '../elements/MessageBox';

const RenderChat = styled.div`
  height: 511px;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding-top: 8px;
`;

const ThreadView = ({ chatData }) => {
  return (
    <RenderChat>
      {chatData.map((chat, i) => (
        <MessageBox key={i} name={chat.sender.name} message={chat.message} />
      ))}
    </RenderChat>
  );
};

ThreadView.propTypes = {
  chatData: PropTypes.arrayOf(PropTypes.shape),
};

export default ThreadView;
