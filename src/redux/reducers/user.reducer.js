import * as actionTypes from '../actionTypes';

const initialStates = {
    userList: [],
    userLoading: false,
    userError: null,

    userPostList: [],
    postlListLoading: false,
    postListError: null,

    activeUserId: null,

    sseNotification: {}
}

const getUserList = (state, action) => {
    return {
        ...state,
        userList: [...state.userList, ...action.data]
    }
}

const getUserPostList = (state, action) => {
    return {
        ...state,
        userPostList: [...state.userPostList, ...action.data]
    }
}

const setUserInfo = (state, action) => {
    return {
        ...state,
        ...action.data
    }
}

const setSseNotification = (state, action) => {
    return {
        ...state,
        sseNotification: action.data
    }
}

const reducer = (state = initialStates, action) => {

    switch (action.type) {
        case actionTypes.GET_USER_LIST:
            return getUserList(state, action);
        case actionTypes.GET_USER_POSTS:
            return getUserPostList(state, action);
        case actionTypes.SET_USER_INFO:
            return setUserInfo(state, action);
        case actionTypes.FETCH_SSE_NOTIFICATION:
            return setSseNotification(state, action)
        default:
            return state
    }
}

export default reducer;