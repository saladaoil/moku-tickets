import React from 'react';
import { fetchMembers } from '../services/members_table';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import Navigation from './Navigation';
import styled from 'styled-components';

const homeUrl = process.env.PUBLIC_URL;

const SLink = styled.div`
  font-weight: bold;
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
    navigate(`${homeUrl}/member/${target_id}`);
  };
  const navigate = useNavigate();

  return (
    <>
      <Navigation title="メンバー一覧" />

      <hr />
      <SLink>
        <Link to={`${homeUrl}/member_registration`}>メンバー登録</Link>
      </SLink>
      <hr />
      {members.map((member) => (
        <ListItem id={member.id} key={member.id} onClick={listClickHandler}>
          {`${member.name}`}
        </ListItem>
      ))}
    </>
  );
};

export default MemberList;
