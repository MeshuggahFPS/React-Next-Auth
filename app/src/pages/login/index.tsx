'use client';

import { AuthContext } from '@/src/context/authentication/Provider';
import { LoginForm } from './form/Form';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <LoginForm />
}

export default Login;