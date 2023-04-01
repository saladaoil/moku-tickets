import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase_api';
import Navigation from './Navigation';
import ColorMessage from './ColorMessage';
import AuthForm from './AuthForm';

const homeUrl = process.env.PUBLIC_URL;

const UserRegistration = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    setMessage('アカウント作成の処理中です');
    event.preventDefault(); // デフォルトの動作を抑制する
    let { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      console.log(error.message);
      setMessage('アカウントを作成できません');
    }
  };

  return (
    <>
      <Navigation title="アカウント作成" />

      <AuthForm
        onSubmit={handleSubmit}
        submitName="アカウント作成"
        authState={{ email, setEmail, password, setPassword }}
      />

      <ColorMessage color="red">{message}</ColorMessage>
    </>
  );
};

export default UserRegistration;
