import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMessageBox = styled.div`
  background-color: #f0f0f0;
  margin-bottom: 8px;
  width: 30%;
  padding: 12px;
  display: flex;
`;

const StyledName = styled.p`
  margin-bottom: 6px;
  color: ${({ name, currentUser }) => (name === currentUser ? 'blue' : 'red')};
`;

const StyledMessage = styled.p`
  margin-left: 8px;
`;

const StyledPlaceholder = styled.div`
  background-color: ${({ name, currentUser }) =>
    name === currentUser ? 'blue' : 'red'};
  color: #fff;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const MessageBox = ({ name, message, currentUser }) => {
  return (
    <StyledMessageBox>
      <StyledPlaceholder name={name} currentUser={currentUser}>
        <h3>{name.charAt(0)}</h3>
      </StyledPlaceholder>
      <div>
        <StyledName name={name} currentUser={currentUser}>
          {name}
        </StyledName>
        <StyledMessage>{message}</StyledMessage>
      </div>
    </StyledMessageBox>
  );
};

MessageBox.propTypes = {
  name: PropTypes.string,
  messge: PropTypes.string,
  currentUser: PropTypes.string,
};

export default MessageBox;
