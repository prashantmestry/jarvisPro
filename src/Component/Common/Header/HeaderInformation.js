import { useAuth0 } from '@auth0/auth0-react';
import { Image } from 'antd';
import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButto';

const HeaderInformation = (props) => {
    const { user, isAuthenticated } = useAuth0();
    return (
        <div className='flex justify-between align-center pad-l-10 pad-r-10'>
            {
                user &&
                <div className='flex'>
                    <div><Image src={user.picture} /></div>
                    <div>{user.name}</div>
                </div>
            }
            <div>
                <LoginButton />
                <LogoutButton />
            </div>
        </div>
    )
}

export default HeaderInformation;