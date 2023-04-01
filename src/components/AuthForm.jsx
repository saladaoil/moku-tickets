import React from 'react';
import Button from './Button';
import styled from 'styled-components';

const SInput = styled.input`
  width: min(90%, 12em);
`;

const AuthForm = ({ onSubmit, submitName, authState }) => {
  const { email, setEmail, password, setPassword } = authState;

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

  // メールアドレス：trim()した後、空ではないこと。正しいフォーマットであること。
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
  }

  // パスワード：空ではないこと。
  function validatePassword(password) {
    return password.length > 0;
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          メールアドレス
          <br />
          <SInput type="email" id="email" value={email} onChange={handleEmailChange} />
        </label>
      </div>
      <div>
        <label>
          パスワード
          <br />
          <SInput type="password" id="password" value={password} onChange={handlePasswordChange} />
        </label>
      </div>

      <div>
        <Button type="submit" disabled={!validate()}>
          {submitName}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
