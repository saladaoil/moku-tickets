import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { dateString, sameDate } from '../utils/date';
import { fetchMember, updateTickets } from '../services/members_table';
import { addUsedHistory, fetchUsedHistories } from '../services/used_history_table';
import { fetchReturnedHistories } from '../services/returned_history_table';

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
  }, []);

  const buy = () => {
    setTickets((prev) => prev + 12);
    setEnableBuying(false);
    setEnableConfirm(true);
  };
  const confirmBuying = () => {
    const newMember = { ...member, tickets };
    updateTickets({ id: member.id, tickets });
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
      <div>
        <h1>チケット管理</h1>
      </div>
      <div>名前： {member.name}</div>
      <div>回数券残り枚数: {tickets}</div>

      {member.tickets === 0 ? (
        <button onClick={buy} disabled={!enableBuying}>
          回数券を購入
        </button>
      ) : (
        <button onClick={useTicket} disabled={!enableUse}>
          使用する
        </button>
      )}
      {member.tickets > 2 && <button onClick={returnTickets}>チケットを返却する</button>}
      <div>{enableConfirm && <button onClick={confirmBuying}>確認</button>}</div>

      <div>
        <h2>使用履歴</h2>
      </div>

      {usedHistories.map((usedHistory) => (
        <div key={usedHistory.used_date}>{dateString(usedHistory.used_date)}</div>
      ))}
      <div>
        <h2>返却履歴</h2>
      </div>
      {returnHistories.map((returnHistory) => (
        <div key={returnHistory.id}>{dateString(returnHistory.return_date)}</div>
      ))}

      <div>
        <Link to="/">メンバー一覧</Link>
      </div>
    </>
  );
};

export default Member;
