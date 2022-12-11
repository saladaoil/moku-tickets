import React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { SessionContext } from '../App';
import icon from '../images/icon.png';

const SContainer = styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding:0 5%;
`;

const Header = () => {
  const session = useContext(SessionContext);
  return (
    <SContainer>
      <div>
        <img src={icon} alt="icon" />
      </div>
      <div>{session?.user?.email}</div>
    </SContainer>
  );
};

export default Header;
