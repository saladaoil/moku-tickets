import React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { SessionContext } from '../App';
import { supabase } from '../services/supabase_api';
import Button from './Button';

const SContainer = styled.div`
    color:white;
    background-color: #8452d3;
    display: flex;
    justify-content: space-between;
    padding:0 3%;
`;
const handleLogout = async (event) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error.message);
  }
};

const Navigation = (props) => {
  const session = useContext(SessionContext);
  return (
    <SContainer>
      <div>{props.title}</div>
      <div>{session && <Button onClick={handleLogout}>LOGOUT</Button>}</div>
    </SContainer>
  );
};

export default Navigation;
