import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (isAuthenticated != null) {
      if (isAuthenticated) {
        setLoading(false);
      } else {
        Router.replace('/auth/login');
      }
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div> carregando</div>;
  }
  return <div> home</div>;
}
