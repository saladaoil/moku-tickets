import React from 'react';
import styled from 'styled-components';

const SButton = styled.button`
    background-color: #e0aaff;
    margin: 0.5em;
    padding: 0.25em 1em;
    margin: 0.25em;
    font-size: 0.8em;
    font-weight: bold;
    color: #3c096d;
`;

const Button = (props) => {
  return (
    <SButton onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </SButton>
  );
};

export default Button;
