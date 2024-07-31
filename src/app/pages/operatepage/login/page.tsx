"use client"
import React from 'react';
import Login from '@/components/login';
import useClearCacheload from '@/hooks/useClearCacheload';

const LoginPage: React.FC = () => {
  useClearCacheload();

  return (
    <Login
      googleText="使用 Google 進行登入"
      emailLabel="信箱 Email"
      passwordLabel="密碼 Password"
      submitButtonText="登入"
      registerLinkText="還沒有帳號?"
    />
  );
};

export default LoginPage;