import React from 'react';
import styled from 'styled-components';

const SButton = styled.button`
    background-color: #ddbcec;
    margin: 0.5em;
    padding: 0.25em;
`;

const Button = (props) => {
  return (
    <SButton onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </SButton>
  );
};

export default Button;
