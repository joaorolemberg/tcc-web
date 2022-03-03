import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Main from '../components/layout/Main';

function Home() {
  const { isAuthenticated, logout } = useAuth();
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
  return (
    <div>
      <button
        onClick={() => (logout())}
        type="button"
      >
        logout
      </button>

    </div>
  );
}
Home.layout = Main;
export default Home;
