import React from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import member_db from '../services/member_db';
import { useState, useEffect } from 'react';
import used_history_db from '../services/used_history_db'
import { dateString, sameDate } from '../utils/date';
import returned_history_db from '../services/returned_history_db';

    const Member = () => {
    const {member_id} = useParams();

    const [member, setMember] = useState({})
    const [tickets, setTickets] = useState(0);
    const [enableBuying, setEnableBuying] = useState(true); 
    const [enableConfirm, setEnableConfirm] = useState(false);
    const [enableUse, setEnableUse] = useState(true);
    const [usedHistories, setUsedHistories] = useState([])
    const [returnHistories,setReturnHistories] = useState([])

    const navigate = useNavigate();
    
    useEffect( () => {
      const member = member_db.get_member(member_id)
      setMember(member)
      setTickets(member.tickets)

      const usedHistories = used_history_db.get_used_histories(member.member_id)
      setUsedHistories(usedHistories)

      const returnHistories = returned_history_db.get_returned_histories(member.member_id)
      setReturnHistories(returnHistories)
      
      const today = new Date(Date.now())
      if(usedHistories.length > 0 && sameDate(usedHistories[0].used_date,today)){
        setEnableUse(false)
      }
    }, [])

    

    const buy = () => {
      setTickets( prev => prev + 12);
      setEnableBuying(false);
      setEnableConfirm(true);
    }

    const returnTickets = () => {
      navigate(`/return_tickets/`, {state: {...member}})
    }

    const confirmBuying = () => {
      const newMember = {...member,tickets: tickets} 
      member_db.update_member(newMember)
      setMember(newMember)
      setEnableConfirm(false);
    }

    const useTicket = () => {
      setTickets(prev => prev - 1);
      const newMember = {...member,tickets: tickets -1} 
      member_db.update_member(newMember)
      setMember(newMember)
      setEnableUse(false)
      const today = new Date(Date.now())
      used_history_db.create_used_history(member_id,today)
      const usedHistories = used_history_db.get_used_histories(member.member_id)
      setUsedHistories(usedHistories)
    }

  return (
    <>
    <div><h1>チケット管理</h1></div>
    <div>名前： {member.name}</div>
    <div>回数券残り枚数: {tickets}</div>
    
    {
      member.tickets === 0 
      ? (<button onClick = {buy} disabled = {!enableBuying}>回数券を購入</button>)
      :<button onClick= {useTicket} disabled = {!enableUse}>使用する</button>
    }
    {
      member.tickets > 2 && <button onClick={returnTickets}>チケットを返却する</button>
      
    }
    <div>
      { enableConfirm && (<button onClick={confirmBuying}>確認</button>)}
    </div>

    <div>
      <h2>使用履歴</h2>
    </div>

        {
          usedHistories.map((usedHistory) => 
            <div key={usedHistory.used_date}> 
              {dateString(usedHistory.used_date)}
            </div>)
        }
      <div>
        <h2>返却履歴</h2>
      </div>
      {
        returnHistories.map((returnHistory) => 
          <div key={returnHistory.returned_date}>
            {dateString(returnHistory.returned_date)}
          </div>
        )
      }

    <div>
    <Link to="/">メンバー一覧</Link>
    </div>
    </>
  )
}

export default Member