import React, { useEffect, useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

const ViewUserPosts = (props) => {

    return (
        <div style={{ padding: '10px' }}>
            fetch user post
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