import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateTickets } from '../services/members_table';
import { addReturnedHistory } from '../services/returned_history_table';
import Button from './Button';
import Navigation from './Navigation';
import styled from 'styled-components';

const homeUrl = process.env.PUBLIC_URL;

const SLink = styled.div`
  font-weight: bold;
`;

const ReturnTickets = () => {
  const location = useLocation();
  const member = location.state;
  const navigate = useNavigate();

  const cancel = () => {
    navigate(`${homeUrl}/member/${member.id}`);
  };

  const reset = async () => {
    await updateTickets({ id: member.id, tickets: 0 });

    const today = new Date(Date.now());
    const refund = (member.tickets - 2) * member.ticket_price;
    addReturnedHistory({
      member_id: member.id,
      return_date: today,
      tickets: member.tickets,
      refund,
    });

    navigate(`${homeUrl}/member/${member.id}`);
  };

  return (
    <>
      <Navigation title="チケット返却" />
      <hr />
      <SLink>
        <Link to={`${homeUrl}`}>一覧へ戻る</Link>
      </SLink>
      <hr />
      <div>名前：{member.name}</div>
      <div>回数券残り枚数：{member.tickets}</div>
      <div>
        回数券{member.tickets - 2}回分
        {member.tickets * member.ticket_price - member.ticket_price * 2}円を返却します
      </div>
      <div>よろしいですか？</div>
      <Button onClick={reset}>返却する</Button>
      <Button onClick={cancel}>キャンセル</Button>
    </>
  );
};

export default ReturnTickets;
