import React from 'react'
import member_db from '../services/member_db';
import {useNavigate,Link} from "react-router-dom";
import styled from "styled-components";

const Sname = styled.div`
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
`
const MemberList = () => {
    const listClickHandler = (e) => {
        let target_id = e.target.id;
        navigate(`/member/${target_id}`)
    }
    const navigate = useNavigate();
    const members = member_db.get_members();
  return (
    <>
        <div><h1>メンバー一覧</h1></div>

        <hr />
        <Link to="/member_registration">メンバー登録</Link>
        <hr />
            { 
                members.map( (member) => (
                    <Sname id={member.member_id} key={member.member_id} onClick={listClickHandler}>
                        {`[${member.name}]`}
                    </Sname>
                ))
            }
    </>
  )
}

export default MemberList