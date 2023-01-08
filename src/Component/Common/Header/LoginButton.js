import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

const LoginButton = (props) => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Button onClick={() => loginWithRedirect()}>
                Sign in
            </Button>
        )
    )
}

export default LoginButton;