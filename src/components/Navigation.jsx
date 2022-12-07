import React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { SessionContext } from '../App';
import { supabase } from '../services/supabase_api';

const SContainer = styled.div`
    background-color: aqua;
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
      <div>{session && <button onClick={handleLogout}>LOGOUT</button>}</div>
    </SContainer>
  );
};

export default Navigation;
