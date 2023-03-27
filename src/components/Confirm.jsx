import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const SOverlay = styled.div`
  /*　画面全体を覆う設定　*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SContent = styled.div`
  z-index:2;
  width: max-content;
  padding: 1em;
  background:#fff;
  border-radius: 5px;
  box-shadow: 10px 5px 5px black;
`;

const STitle = styled.h4`
  background-color: #231942;
  color: white;
  text-align: center;
`;

const Confirm = ({ open, setOpenState, execute, title, children }) => {
  const close = () => setOpenState(false);
  if (open) {
    return (
      <SOverlay>
        <SContent>
          <STitle>{title}</STitle>
          <div>{children}</div>
          <Button onClick={execute}>OK</Button>
          <Button onClick={close}>CANCEL</Button>
        </SContent>
      </SOverlay>
    );
  } else {
    return null;
  }
};

export default Confirm;
