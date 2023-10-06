import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/authentication/Provider';
import Loader from '../components/loader/loader';

const withAuthentication = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WrappedComponentWithAuth = (props: P) => {
        const { isAuthenticated } = useContext(AuthContext);
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        }, [isAuthenticated, router]);

        if (isLoading) {
            return <Loader />
        }

        return <WrappedComponent {...props} />;
    };

    WrappedComponentWithAuth.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WrappedComponentWithAuth;
};

export default withAuthentication;
