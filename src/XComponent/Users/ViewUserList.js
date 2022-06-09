import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import { Badge, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

const ViewUserList = (props) => {

    const [userState, setUserState] = useState({
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    })


    useEffect(() => {
        props.fetchUserList(1, 0);
    }, []);


    // let userClickHandler = (id) => {

    //     if (id !== props.userInfo.activeUserId) {
    //         props.setUserInfo({
    //             ...props.userInfo,
    //             activeUserId: id
    //         });

    //         let isUserPostPresent = props.userInfo.userPostList.find(post => post.userId === id);
    //         if (!isUserPostPresent) {
    //             props.fetchUserPosts(id);
    //         }
    //     }
    // }


    const onLoadMore = () => {
        console.log('on load more');
    }

    const loadMore =
        //!userState.initLoading && !userState.loading ? (
        !props.users.userLoading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={() => onLoadMore()}>loading more</Button>
            </div>
        ) : null;

    return (
        <List
            className="demo-loadmore-list"
            loading={props.users.userLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={props.users.userList}
            renderItem={item =>
            (
                <List.Item
                    actions={[<a key="list-loadmore-edit">Edit</a>, <a key="list-loadmore-more">Delete</a>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            //avatar={<Avatar src={item.picture.large} />}
                            title={item.name}
                            description={Object.values(item.address).join(" ")}
                        />
                        <div>{item.email}</div>
                    </Skeleton>
                </List.Item>
            )
            }
        />

        // <div style={{ padding: '10px' }}>
        //     Users
        //     <ListGroup as="ol" numbered>
        //         {
        //             (props.userList && props.userList.length > 0) && props.userList.map(user => {
        //                 return (
        //                     <ListGroup.Item
        //                         key={user.id}
        //                         as="li"
        //                         className="d-flex justify-content-between align-items-start"
        //                         variant={props.userInfo.activeUserId === user.id ? 'success' : null}
        //                         onClick={() => userClickHandler(user.id)}
        //                     >
        //                         <div className="ms-2 me-auto">
        //                             <div className="fw-bold">{user.name}</div>
        //                             {user.email}
        //                         </div>
        //                         <Badge variant="primary" pill>
        //                             {user.id}
        //                         </Badge>
        //                     </ListGroup.Item>
        //                 )
        //             })
        //         }
        //     </ListGroup>
        // </div>
    )
}

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