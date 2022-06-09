import React, { useEffect, useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

const ViewUserPosts = (props) => {

    return (
        <div style={{ padding: '10px' }}>            
            <ListGroup numbered>
                {
                    (props.userPostList && props.userPostList.length > 0) &&
                    props.userPostList.filter(uVal => uVal.userId === props.userInfo.activeUserId).map(post => {
                        return (
                            <ListGroup.Item
                                key={post.id}
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{post.title}</div>
                                    {post.body}
                                </div>
                                <Badge variant="primary" pill>
                                    {post.userId}
                                </Badge>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

let mapStateToProps = state => {
    return {
        userInfo: state.users,
        userPostList: state.users.userPostList
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        fetchUserPosts: (userId) => dispatch(actions.fetchUserPosts(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPosts);