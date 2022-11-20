import React from 'react';
import { fetchMembers } from '../services/members_table';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListItem from './ListItem';

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
        <ListItem id={member.id} key={member.id} onClick={listClickHandler}>
          {`[${member.name}]`}
        </ListItem>
      ))}
    </>
  );
};

export default MemberList;
