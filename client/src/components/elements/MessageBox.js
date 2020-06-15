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
  color: ${(props) => (props.isLoggedIn ? 'blue' : 'red')};
`;

const StyledMessage = styled.p`
  margin-left: 8px;
`;

const StyledAvatar = styled.div`
  background: #fff;
  color: black;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const MessageBox = ({ name, message }) => {
  return (
    <StyledMessageBox>
      <StyledAvatar>
        <h3>{name.charAt(0)}</h3>
      </StyledAvatar>
      <div>
        <StyledName>{name}</StyledName>
        <StyledMessage>{message}</StyledMessage>
      </div>
    </StyledMessageBox>
  );
};

MessageBox.propTypes = {
  name: PropTypes.string,
  messge: PropTypes.string,
};

export default MessageBox;
