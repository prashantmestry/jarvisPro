import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

const LogoutButton = (props) => {

    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button onClick={() => logout()}>
                Sign out
            </Button>
        )
    )
}

export default LogoutButton;