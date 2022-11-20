import React from 'react';
import styled from 'styled-components';

const SListItem = styled.div`
    padding: 5px;
    margin-left: 20px;
    margin-right: 20px;
    list-style-type: none;
    background-color: aqua;
    border-bottom: 1px gray dotted;
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
