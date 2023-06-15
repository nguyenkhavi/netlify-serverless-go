'use client';
//THIRD PARTY MODULES
import { Magic } from 'magic-sdk';
import { Gender } from '_@rpc/drizzle/enum';
import { nextApi } from '_@landing/utils/api';
import React, { useEffect, useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import BaseInput from '_@shared/components/BaseInput';

const magic = new Magic(`${process.env.NEXT_PUBLIC_MAGIC_API_KEY}`, {
  network: 'mainnet',
});

function Sessions() {
  const { mutateAsync: signUpFn } = nextApi['signup'].useMutation({});
  const { mutateAsync: postSignUpFn } = nextApi['post-signup'].useMutation({});
  const { mutateAsync: validateLoginFn } = nextApi['validate-login'].useMutation({
    onError: (e) => {
      console.log({ e });
    },
  });

  const { mutateAsync: loginFn } = nextApi['login'].useMutation({});
  const { mutateAsync: logoutFn } = nextApi['logout'].useMutation({});

  const [_, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: sessions = [] } = nextApi['list-session'].useQuery(undefined, {});

  const _handleLogin = async () => {
    const found = await validateLoginFn({
      phone: {
        phoneCode: '84',
        phoneNumber: '374246292',
      },
    });
    if (found) {
      const didToken = await magic.auth.loginWithEmailOTP({ email: 'vidzai@mailinator.com' });

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', didToken || '');
      }
      await loginFn();
      _refresh();
    }
  };
  const _handleSignUp = async () => {
    const requestId = await signUpFn({
      username: 'vidzai',
      email: 'vidzai@mailinator.com',
      lastName: 'Nguyen',
      firstName: 'Vi',
      dob: new Date().toISOString(),
      gender: Gender.MALE,
      phone: {
        phoneCode: '84',
        phoneNumber: '374246292',
      },
    });
    const didToken = await magic.auth.loginWithEmailOTP({ email: 'vidzai@mailinator.com' });

    if (didToken) {
      const postRes = await postSignUpFn({
        didToken,
        requestId,
      });
      if (postRes) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', didToken || '');
        }
        _refresh();
      }
    }
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
  const _handleChange = (e: any) => {
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
      <Button onClick={_handleSignUp} className="flex">
        Sign Up
      </Button>
    </div>
  );
}

export default Sessions;
