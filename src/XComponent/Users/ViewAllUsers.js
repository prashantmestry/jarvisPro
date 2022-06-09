import React from 'react';
import ViewUserList from './ViewUserList';
import ViewUserPosts from './ViewUserPosts';
import styled from 'styled-components';

const ViewAllUsers = (props) => {
    return (
        <DoubleBox>
            <div>                
                <ViewUserList />
            </div>
            <div>
                <ViewUserPosts />
            </div>
        </DoubleBox>
    )
}

let DoubleBox = styled.div`
    display : flex;
    div:nth-child(1){
        flex:1;
    }
    div:nth-child(2){
        flex:1;
    }
`;

export default ViewAllUsers;