import React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { SessionContext } from '../App';
import icon from '../images/icon.png';

const SContainer = styled.div`
    height: 42px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 2px 10px;
    color: #9d4edd;
    font-weight: bold;
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
