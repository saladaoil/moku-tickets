import React from 'react';
import styled from 'styled-components';

const SListItem = styled.div`
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;
    list-style-type: none;
    background-color: #9d4edd;
    border-bottom: 2px white solid;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;

    :last-child{
      border-bottom: none;
    }
`;

const ListItem = (props) => {
  return (
    <SListItem id={props.id} key={props.id} onClick={props.onClick}>
      {props.children}
    </SListItem>
  );
};

export default ListItem;
