import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WrapperContainer = styled.div`
  padding: 0px 12px;
  max-width: 1280px;
  margin: 0 auto;
`;

const Wrapper = ({ children }) => {
  return <WrapperContainer>{children}</WrapperContainer>;
};

Wrapper.propTypes = {
  children: PropTypes.node,
};

export default Wrapper;
