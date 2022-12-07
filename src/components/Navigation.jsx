import React from 'react';
import styled from 'styled-components';

const SContainer = styled.div`
    background-color: aqua;
`;

const Navigation = (props) => {
  return (
    <SContainer>
      <div>{props.title}</div>
      <div>
        <button>LOGOUT</button>
      </div>
    </SContainer>
  );
};

export default Navigation;
