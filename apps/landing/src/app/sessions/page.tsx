'use client';
//THIRD PARTY MODULES
import { Magic } from 'magic-sdk';
import { api } from '_@landing/utils/api';
import React, { useEffect, useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import BaseInput from '_@shared/components/BaseInput';

const magic = new Magic(`${process.env.NEXT_PUBLIC_MAGIC_API_KEY}`, {
  network: 'mainnet',
});

function Sessions() {
  const { mutateAsync: loginFn } = api['login'].useMutation({});
  const { mutateAsync: logoutFn } = api['logout'].useMutation({});

  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: sessions = [] } = api['list-session'].useQuery(undefined, {});

  const _handleLogin = async () => {
    const didToken = await magic.auth.loginWithEmailOTP({ email });

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', didToken || '');
    }
    await loginFn();
    _refresh();
  };
  const _handleLogout = async () => {
    try {
      await magic.user.logout();
      await logoutFn();
    } finally {
      localStorage.setItem('token', '');
      _refresh();
    }
  };
  const _handleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    setEmail(target.value);
  };
  const _refresh = () => {
    magic.user.isLoggedIn().then(setIsLoggedIn);
  };
  useEffect(() => {
    _refresh();
  }, []);
  console.log({ sessions, isLoggedIn });

  return (
    <div className="flex w-[200px] flex-col items-center">
      {isLoggedIn ? (
        <Button onClick={_handleLogout} className="flex">
          Log out
        </Button>
      ) : (
        <>
          <BaseInput onChange={_handleChange} />
          <Button onClick={_handleLogin} className="flex">
            Login
          </Button>
        </>
      )}
    </div>
  );
}

export default Sessions;
