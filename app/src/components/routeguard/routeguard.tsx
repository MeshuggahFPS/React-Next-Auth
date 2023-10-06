import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/src/context/authentication/Provider';

export { RouteGuard };

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const publicPaths = ['/login', '/register'];
    const path = router.asPath.split('?')[0];
    if (isAuthenticated && !publicPaths.includes(path)) {
      router.push({
        pathname: '/protected/home',
      });
    }
    
  }, [isAuthenticated, router, router.asPath]);

  return children;
}
