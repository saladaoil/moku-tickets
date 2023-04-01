import React from 'react';
import styled from 'styled-components';

const SMessage = styled.p`
  color: ${(props) => props.color ?? 'blue'};
`;

const ColorMessage = ({ color, children }) => {
  return <SMessage color={color}>{children}</SMessage>;
};

export default ColorMessage;
