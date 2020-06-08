import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RenderChat = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 3px 24px -8px rgba(0, 0, 0, 0.75);
`;

const ThreadView = ({ chatData }) => {
  return (
    <RenderChat>
      {chatData.map((chat, i) => (
        <p key={i}>
          {chat.sender.name}: {chat.message}
        </p>
      ))}
    </RenderChat>
  );
};

ThreadView.propTypes = {
  chatData: PropTypes.arrayOf(PropTypes.shape),
};

export default ThreadView;
