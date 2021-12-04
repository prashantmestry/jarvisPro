import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { typeCodeAxios } from '../../axiosConfig';


const getUserList = (data) => {
    return {
        type: actionTypes.GET_USER_LIST,
        data: data
    }
}

export const fetchUserList = (pageNumber, offset) => {
    return dispatch => {
        typeCodeAxios.get('/users').then(resp => {
            if ((resp?.status === 200) && (resp?.data)) {
                return dispatch(getUserList(resp.data));
            } else {
                return dispatch(getUserList([]));
            }
        }).catch(err => {
            console.log('error ', err)
        });
    }
}


const getUserPostList = (data) => {
    return {
        type: actionTypes.GET_USER_POSTS,
        data: data
    }
}

export const fetchUserPosts = (userId) => {
    return dispatch => {
        typeCodeAxios.get(`/users/${userId}/posts`).then(resp => {
            if ((resp?.status === 200) && (resp?.data)) {
                return dispatch(getUserPostList(resp.data));
            } else {
                return dispatch(getUserPostList([]));
            }
        }).catch(err => {
            console.log('error ', err)
        });
    }
}


export const setUserInfo = (data) => {
    return {
        type: actionTypes.SET_USER_INFO,
        data: data
    }
}



const setSseNotification = (data) => {
    return {
        type: actionTypes.FETCH_SSE_NOTIFICATION,
        data: data
    }
}

export const fetchNotification = () => {
    return dispatch => {
        
        let eventSource = new EventSource("http://localhost:5000/events");

       
    }
}