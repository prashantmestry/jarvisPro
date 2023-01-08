import { useAuth0 } from '@auth0/auth0-react';
import { Image } from 'antd';
import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButto';
import { LoadingOutlined } from '@ant-design/icons';

const HeaderInformation = (props) => {
    const { isLoading, error, user, isAuthenticated } = useAuth0();
    console.log('login user info', user);
    return (
        <div className='flex justify-between align-center pad-l-10 pad-r-10'>
            {
                error && <span>{error}</span>
            }
            {
                (!error && isLoading) && <LoadingOutlined />
            }
            {
                (user && isAuthenticated) &&
                <div className='flex'>
                    <div><Image width={40} src={user.picture} /></div>
                    <div className='mar-l-10'>{user.name}</div>
                </div>
            }
            Author {process.env.REACT_APP_AUTHOR}
            {
                (!error && !isLoading) &&
                <div>
                    <LoginButton />
                    <LogoutButton />
                </div>
            }
        </div>
    )
}

export default HeaderInformation;