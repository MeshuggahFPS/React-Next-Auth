import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/authentication/Provider';

const withAuthentication = <P extends object>(WrappedComponent: React.ComponentType<P>, options?: { redirectPath?: string }) => {
    const WrappedComponentWithAuth: React.FC<P> = (props) => {
        const { isAuthenticated } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push(options?.redirectPath || '/login');
            }
        }, [isAuthenticated, router]);


        return <WrappedComponent {...props} />;
    };

    WrappedComponentWithAuth.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WrappedComponentWithAuth;
};

export default withAuthentication;
