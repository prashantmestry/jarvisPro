import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, Skeleton, Input } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import styled from 'styled-components';

const ViewUserList = (props) => {

    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        props.fetchUserList(1, 0);
    }, []);

    const onLoadMore = () => {
        console.log('on load more');
    }

    // const loadMore =
    //     !props.users.userLoading ? (
    //         <div
    //             style={{
    //                 textAlign: 'center',
    //                 marginTop: 12,
    //                 height: 32,
    //                 lineHeight: '32px',
    //             }}
    //         >
    //             <Button onClick={() => onLoadMore()}>loading more</Button>
    //         </div>
    //     ) : null;


    const getMessage = () => {
        console.log('Output result will come here...', userInput);
    }


    const debounceFunction = (fun, duration) => {
        let outId;
        return (...args) => {
            clearTimeout(outId);
            outId = setTimeout(() => {
                fun(...args)
            }, duration)
        }
    }


    const [name, setName] = useState("");

    const myDebounce = (callBack, time) => {
        let callId = 0;
        return (...args) => {
            if (callId) {
                clearInterval(callId);
            }
            callId = setTimeout(() => {
                callBack(...args);
            }, time);
        };
    };

    const meFetch = myDebounce((data) => {
        setName(data);
    }, 2000);


    return (
        <ListBox>

            <Input type="text" onChange={(e) => meFetch(e.target.value)} />
            name :{name}
            <input
                type="text"
                style={{ width: '500px' }}
                //value={userInput}
                onChange={(e) => myDebounce((e) => {
                    console.log('done typig')
                }, 2000)
                } />


            {/* <List
                className="demo-loadmore-list"
                loading={props.users.userLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={props.users.userList}
                renderItem={item =>
                (
                    <List.Item actions={[<a key="list-loadmore-edit">Edit</a>, <a key="list-loadmore-more">Delete</a>]} >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={item.name}
                                description={Object.values(item.address).join(" ")}
                            />
                            <div>{item.email}</div>
                        </Skeleton>
                    </List.Item>
                )
                }
            /> */}
        </ListBox>
    )
}

const ListBox = styled.div`
    .demo-loadmore-list{                
    }
    .ant-list-item{
        color : ${props => props.theme.color.text};
    }
    .ant-list-item-meta-title{
        color : ${props => props.theme.color.text};
    }
    .ant-list-item-meta-description{
        color : ${props => props.theme.color.lightText};
    }
`;

let mapStateToProps = state => {
    return {
        users: state.users,
        userList: state.users.userList
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        fetchUserList: (pageNum, offset) => dispatch(actions.fetchUserList(pageNum, offset)),
        setUserInfo: (data) => dispatch(actions.setUserInfo(data)),
        fetchUserPosts: (userId) => dispatch(actions.fetchUserPosts(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserList);