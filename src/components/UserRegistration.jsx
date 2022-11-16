import React from 'react';
import { useState } from 'react';
import { supabase } from '../services/supabase_api';

const UserRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // 入力値(メールアドレス、パスワード)の検証
  const validate = () => {
    return validateEmail(email) && validatePassword(password);
  };

  //メールアドレス：trim()して空ではないこと、正しいフォーマット
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
  }

  //パスワード：空ではないこと
  function validatePassword(password) {
    return password.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); //デフォルトの動作を抑制する

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div>
        <h1>アカウント作成</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            メールアドレス:
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </label>
        </div>

        <div>
          <label>
            パスワード:
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </label>
        </div>
        <div>
          <button type="submit" disabled={!validate()}>
            アカウント作成
          </button>
        </div>
      </form>
    </>
  );
};

export default UserRegistration;
