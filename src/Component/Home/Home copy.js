import React, { useEffect, useState } from 'react';
import * as actions from '../../redux/actions';

import { connect } from 'react-redux';
import styled from 'styled-components';
import DisplayUser from './Comp/DisplayUser';

const Home = (props) => {

    const [users, setUsers] = useState([
        {
            name: "Vicky",
            id: "A123",
            state: ""
        },
        {
            name: "Kiran",
            id: "B123",
            state: ""
        },
        {
            name: "Johny",
            id: "C123",
            state: ""
        }
    ]);

    //let eventSource = new EventSource("http://localhost:5000/events");

    let eventSource = new EventSource("http://internal-a2a034fcaae3449f18ee06c483efd962-112038499.ap-south-1.elb.amazonaws.com/notifiactionbroadcast?id=12344");

    let addNewUser = (sseData) => {
        console.log('addNewUser data', sseData);
        let tempUser = JSON.parse(JSON.stringify(users));
        tempUser.push(sseData);
        setUsers(tempUser);
    }

    let updateUser = (sseData) => {
        console.log('updateUser data', sseData);
        let updatedUsers = users.map(user => {
            if (user.id === sseData.id) {
                user.state = sseData.state
            }
            return user;
        });
        setUsers(updatedUsers);
    }

    let notificationWork = () => {
        console.log('notificationWork');
        eventSource.addEventListener("portfolioAdded", e => {
            addNewUser(JSON.parse(e.data));
        });

        eventSource.addEventListener("portfolioUpdated", e => {
            updateUser(JSON.parse(e.data));
        })

        // eventSource.onmessage = e => {
        //     updateLocalState(JSON.parse(e.data));
        // }
    }



    let closeConnection = () => {
        eventSource.close();
    }


    useEffect(() => {
        //props.fetchNotification();        
    }, []);

    return (
        <div>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Server Sent Event</div>
            <UserBox>
                {
                    users.map(val => <DisplayUser user={val} />)
                }
                <button onClick={() => notificationWork()}>Change state</button>
                <button style={{ marginLeft: '10px' }} onClick={() => closeConnection()}>Close Connection</button>
            </UserBox>
        </div>
    )
}

let UserBox = styled.div`
    border : 1px solid gray;
    padding:10px;    
`;

const mapStateToProps = state => {
    return {
        sseNotification: state.users.sseNotification
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotification: () => dispatch(actions.fetchNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

