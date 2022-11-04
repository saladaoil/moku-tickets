import React from 'react';
import { fetchMembers } from '../services/members_table';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

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
`;
const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers().then((members) => {
      setMembers(members);
    });
  }, []);

  const listClickHandler = (e) => {
    let target_id = e.target.id;
    navigate(`/member/${target_id}`);
  };
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>メンバー一覧</h1>
      </div>

      <hr />
      <Link to="/member_registration">メンバー登録</Link>
      <hr />
      {members.map((member) => (
        <Sname id={member.id} key={member.id} onClick={listClickHandler}>
          {`[${member.name}]`}
        </Sname>
      ))}
    </>
  );
};

export default MemberList;
