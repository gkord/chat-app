import styled from 'styled-components';

const Button = styled.button`
  font-family: 'Helvetica Neue', sans-serif;
  cursor: pointer;
  display: inline-block;
  padding: 10px 15px;
  font-size: 14px;
  background: #28a745;
  color: #fff;
  border-radius: 12px;
  border: 1px solid transparent;
  -webkit-appearance: none;
  &:hover {
    background: #218838;
  }
`;

export default Button;
