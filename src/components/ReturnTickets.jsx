import React from 'react'
import {Link,useLocation,useNavigate} from "react-router-dom";
import member_db from '../services/member_db';
import returned_history_db from '../services/returned_history_db';

const ReturnTickets = () => {
    // const member = member_db.get_members()
    const location = useLocation();
    const member = location.state;
    const navigate = useNavigate()
    
    const cancel = () => {
      navigate(`/member/${member.member_id}`)
    }

    const reset = () => {
      const newMember = {...member,tickets: 0} 
      member_db.update_member(newMember)
      const today = new Date(Date.now())
      returned_history_db.create_returned_history(member.member_id,today)
      navigate(`/member/${member.member_id}`)
    }

  return (
    <>
    <div><h1>チケットを返却</h1></div>
    <div>名前：{member.name}</div>
    <div>回数券残り枚数：{member.tickets}</div>
    <div>回数券{member.tickets - 2}回分{member.tickets * 200}円を返却します</div>
    <div>よろしいですか？</div>
    <button onClick={reset}>返却する</button>
    <button onClick={cancel}>キャンセル</button>
    <div>
        <Link to="/">メンバー一覧へ</Link>
    </div>
    </>
  )
}

export default ReturnTickets