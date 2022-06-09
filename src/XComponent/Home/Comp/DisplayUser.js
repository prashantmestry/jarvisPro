import React from 'react';
import styled from 'styled-components';
import withUser from '../Hoc/withUsers';
//import UserContextProvider from '../Context/UserContext';

const DisplayUser = ({ user, ...props }) => {

    return (
        // <UserContextProvider>
            <UserBox key={user.id}>
                Student <strong>{user.name}</strong> is {user.state ? <span className='newText'>{user.state}</span> : 'Doing nothing'}
                <div>color : {props.color} </div>
            </UserBox>
        // </UserContextProvider>
    )
}

let UserBox = styled.div`
    border : 1px solid gray;
    margin-bottom:15px;
    padding:5px;
    color : #216d9b;

    .newText{
        color : #fd471c;
        font-weight:bold;
    }
`;

export default withUser(DisplayUser);