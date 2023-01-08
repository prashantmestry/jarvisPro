import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButto';

const HeaderInformation = (props) => {
    return (
        <div className='flex justify-between align-center pad-l-10 pad-r-10'>
            <div>One

        { process.env.REACT_APP_JARVIS_FASTAPI_URL}
            </div>
            <div>
                <LoginButton />
                <LogoutButton />
            </div>
        </div>
    )
}

export default HeaderInformation;