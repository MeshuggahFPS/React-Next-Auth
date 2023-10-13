import React, { useContext }  from 'react';
import Button from '@/src/components/button/Button';
import { AuthContext } from '@/src/context/authentication/Provider';
import withAuthentication from '@/src/helpers/useRouteGuard';

const Home = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <main>
      <div>
        <p>
          This is a protected page. You can only see this page if you are logged in.
        </p>
        <Button type="button" label="Logout" onClick={logout} style={"primary"} />
      </div>
    </main>
  )
}

export default withAuthentication(Home);
