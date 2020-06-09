import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMessageBox = styled.div`
  background-color: #f0f0f0;
  margin-bottom: 8px;
  width: 25%;
  padding: 12px;
`;

const StyledName = styled.p`
  margin-bottom: 6px;
  color: ${(props) => (props.isLoggedIn ? 'blue' : 'red')};
`;

const StyledMessage = styled.p`
  margin-left: 8px;
`;

const MessageBox = ({ name, message }) => {
  return (
    <StyledMessageBox>
      <StyledName>{name}</StyledName>
      <StyledMessage>{message}</StyledMessage>
    </StyledMessageBox>
  );
};

MessageBox.propTypes = {
  name: PropTypes.string,
  messge: PropTypes.string,
};

export default MessageBox;
