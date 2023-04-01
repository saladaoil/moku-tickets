import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { dateString, sameDate } from '../utils/date';
import { fetchMember, updateTickets, updateTicketsAndPrice } from '../services/members_table';
import { addUsedHistory, fetchUsedHistories } from '../services/used_history_table';
import { fetchReturnedHistories } from '../services/returned_history_table';

import Confirm from './Confirm';
import Navigation from './Navigation';
import Button from './Button';
import styled from 'styled-components';

const STicketInfo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin: 30px 0
`;

const SLink = styled.div`
  font-weight: bold;
`;

const Member = () => {
  const { member_id } = useParams();

  const [member, setMember] = useState({});
  const [tickets, setTickets] = useState(0);
  const [enableBuying, setEnableBuying] = useState(true);
  const [enableConfirm, setEnableConfirm] = useState(false);
  const [enableUse, setEnableUse] = useState(true);
  const [usedHistories, setUsedHistories] = useState([]);
  const [returnHistories, setReturnHistories] = useState([]);

  const navigate = useNavigate();

  const [ticketPrice, setTicketPrice] = useState('200円回数券');
  const onPriceChange = (e) => setTicketPrice(e.target.value);

  const TICKET_RADIO = [
    {
      itemName: '200円回数券',
      value: 200,
    },
    {
      itemName: '100円回数券',
      value: 100,
    },
  ];

  useEffect(() => {
    fetchMember(member_id).then((member) => {
      setMember(member);
      setTickets(member.tickets);
      fetchUsedHistories(member_id).then((usedHistories) => {
        setUsedHistories(usedHistories);
        const today = new Date(Date.now());
        if (usedHistories.length > 0 && sameDate(usedHistories[0].used_date, today)) {
          setEnableUse(false);
        }
      });
    });

    fetchReturnedHistories(member_id).then((returnHistories) => {
      setReturnHistories(returnHistories);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buy = () => {
    setEnableBuying(false);
    setEnableConfirm(true);
  };
  const confirmBuying = () => {
    let ticket_price;
    switch (ticketPrice) {
      case '200円回数券':
        ticket_price = 200;
        break;
      case '100円回数券':
        ticket_price = 100;
        break;
      default:
        throw new Error('ticketPriceの値が不明');
    }

    setTickets((prev) => prev + 12);
    const tickets = 12;
    const newMember = { ...member, tickets, ticket_price };
    updateTicketsAndPrice({ id: member.id, tickets, ticket_price });
    setMember(newMember);
    setEnableConfirm(false);
  };

  const returnTickets = () => {
    navigate(`/return_tickets/`, { state: { ...member } });
  };

  const useTicket = () => {
    updateTickets({ id: member.id, tickets: tickets - 1 }); //データベースを更新

    setTickets((prev) => prev - 1);
    const newMember = { ...member, tickets: tickets - 1 };
    setMember(newMember);

    setEnableUse(false);
    const today = new Date(Date.now());
    addUsedHistory({ member_id, used_date: today }).then((status) => {
      fetchUsedHistories(member_id).then((usedHistories) => {
        setUsedHistories(usedHistories);
      });
    });
  };

  return (
    <>
      <Navigation title="チケット管理" />

      <Confirm
        open={enableConfirm}
        setOpenState={setEnableConfirm}
        execute={confirmBuying}
        title="回数券購入"
      >
        回数券を購入しますか？
      </Confirm>

      <hr />
      <SLink>
        <Link to="/">一覧へ戻る</Link>
      </SLink>
      <hr />

      <STicketInfo>
        <div>名前： {member.name}</div>
        <div>回数券残り枚数: {tickets}</div>
      </STicketInfo>

      {member.tickets === 0 ? (
        <>
          <div>
            {TICKET_RADIO.map((item) => {
              return (
                <label key={item.value}>
                  <input
                    type="radio"
                    value={item.itemName}
                    checked={ticketPrice === item.itemName}
                    onChange={onPriceChange}
                  />
                  {item.itemName}
                </label>
              );
            })}
          </div>
          <div>
            <Button onClick={buy}>回数券を購入</Button>
          </div>
        </>
      ) : (
        <Button onClick={useTicket} disabled={!enableUse}>
          使用する
        </Button>
      )}
      {member.tickets > 2 && <Button onClick={returnTickets}>チケットを返却する</Button>}
      <div>{enableConfirm && <Button onClick={confirmBuying}>確認</Button>}</div>

      <div>
        <h3>使用履歴</h3>
      </div>

      {usedHistories.map((usedHistory) => (
        <div key={usedHistory.used_date}>{dateString(usedHistory.used_date)}</div>
      ))}
      <div>
        <h3>返却履歴</h3>
      </div>
      {returnHistories.map((returnHistory) => (
        <div key={returnHistory.id}>{dateString(returnHistory.return_date)}</div>
      ))}
    </>
  );
};

export default Member;
