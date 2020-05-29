import React from 'react';
import PropTypes from 'prop-types';

const ThreadView = ({ chatData }) => {
  return (
    <div className='render-chat'>
      <h2>Chat Log</h2>
      <div>
        {chatData.map((chat, i) => (
          <h3 key={i}>
            {chat.sender.name}: {chat.message}
          </h3>
        ))}
      </div>
    </div>
  );
};

ThreadView.propTypes = {
  chatData: PropTypes.arrayOf(PropTypes.shape),
};

export default ThreadView;
