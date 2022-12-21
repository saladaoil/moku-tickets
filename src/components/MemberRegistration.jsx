import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addMember } from '../services/members_table';
import Button from './Button';
import Navigation from './Navigation';

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
    navigate(`/`);
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

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            名前:
            <input type="text" id="name" value={name} onChange={handleNameChange} />
          </label>
        </div>

        <div>
          性別：
          {Object.entries(genderRadioOption).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                id={key}
                name="gender"
                value={value}
                checked={gender === value}
                onChange={handleGenderChange}
              />
              {value}
            </label>
          ))}
        </div>
        {/* <div>
          性別:
          <label>
            <input type="radio" key="man" id="man" name="gender" value="男性"
              onChange={handleGenderChange} checked={gender === '男性'}
            />
            男性
          </label>

          <label>
            <input type="radio" key="women" id="women" name="gender" value="女性"
              onChange={handleGenderChange} checked={gender === '女性'}
            />
            女性
          </label>
        </div> */}

        <div>
          <Button type="submit" disabled={!validateName()}>
            登録
          </Button>
        </div>
      </form>
      <Link to="/">メンバー一覧へ</Link>
    </>
  );
};

export default MemberRegistration;
