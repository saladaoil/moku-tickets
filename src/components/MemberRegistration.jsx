import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addMember } from '../services/members_table';
import Button from './Button';
import Navigation from './Navigation';
import styled from 'styled-components';

const homeUrl = process.env.PUBLIC_URL;

const SInput = styled.input`
  width: min-content(90%, 12em);
  margin-bottom: 1em;
`;

const SRadioLabel = styled.label`
  margin: 0 0.5em;
`;

const SLink = styled.div`
  font-weight: bold;
`;

const MemberRegistration = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('男性');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //デフォルトの動作を抑制する
    // console.log(`name: ${name} gender${gender}`)

    addMember({ name, tickets: 0 });
    navigate(`${homeUrl}`);
  };

  //名前が有効かチェックし、有効な場合はtrueを返す。
  const validateName = () => {
    return name.trim().length > 0;
  };

  const genderRadioOption = {
    man: '男性',
    woman: '女性',
  };

  return (
    <>
      <Navigation title="メンバー登録" />
      <hr />
      <SLink>
        <Link to={`${homeUrl}`}>一覧へ戻る</Link>
      </SLink>
      <hr />

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            名前
            <br />
            <SInput type="text" id="name" value={name} onChange={handleNameChange} />
          </label>
        </div>

        <div>
          性別
          <br />
          {Object.entries(genderRadioOption).map(([key, value]) => (
            <SRadioLabel key={key}>
              <input
                type="radio"
                id={key}
                name="gender"
                value={value}
                checked={gender === value}
                onChange={handleGenderChange}
              />
              {value}
            </SRadioLabel>
          ))}
        </div>

        <div>
          <Button type="submit" disabled={!validateName()}>
            登録
          </Button>
        </div>
      </form>
    </>
  );
};

export default MemberRegistration;
