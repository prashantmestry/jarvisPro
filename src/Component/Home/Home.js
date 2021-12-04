import React, { useEffect, useState } from 'react';
import * as actions from '../../redux/actions';

import { connect } from 'react-redux';
import styled from 'styled-components';

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

    let eventSource = new EventSource("http://localhost:3005/events");
  //  let eventSource = new EventSource("http://internal-a2a034fcaae3449f18ee06c483efd962-112038499.ap-south-1.elb.amazonaws.com/notifiactionbroadcast?id=12344");

    eventSource.onopen = function () {
        console.log('SSE connection open');
    }

    let addNewUser = (sseData) => {        
        let tempUser = JSON.parse(JSON.stringify(users));
        tempUser.push(sseData);
        setUsers(tempUser);
    }

    let updateLocalState = (sseData) => {
        let updatedUsers = users.map(user => {
            if (user.id === sseData.id) {
                user.state = sseData.state
            }
            return user;
        });

        setUsers(updatedUsers);
    }

    let notificationWork = () => {

        eventSource.onmessage = e => {
            console.log('data ' , JSON.parse(e.data));
            updateLocalState(JSON.parse(e.data));
        }
        eventSource.addEventListener("portfolioAdded", e => {
            console.log('event data ' , JSON.parse(e.data));
            addNewUser(JSON.parse(e.data));
        });
    }

    let closeConnection = () => {
        eventSource.close();
    }

    useEffect(() => {
        //props.fetchNotification();        
    }, []);

    return (
        <div>
            Server ent Event
            <UserBox>
                {
                    users.map(val => {
                        return (
                            <div className='singleBox' key={val.id}>
                                Student <strong>{val.name}</strong> is {val.state ? <span className='newText'>{val.state}</span> : 'Doing nothing'}
                            </div>
                        )
                    })
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

    .singleBox{
        border : 1px solid gray;
        margin-bottom:15px;
        padding:5px;
        color : #216d9b;
        .newText{
            color : #fd471c;
            font-weight:bold;
        }
    }
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

