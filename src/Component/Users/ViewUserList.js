import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import styled from 'styled-components';

const ViewUserList = (props) => {

    useEffect(() => {
        props.fetchUserList(1, 0);
    }, []);

    const onLoadMore = () => {
        console.log('on load more');
    }

    const loadMore =
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
        <ListBox>
            <List
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
            />
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