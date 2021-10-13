import * as actionTypes from '../../actionTypes';

const initialStates = {
    blogList: [
        { title: 'one', description: 'Here is my one blog', counter: 1 }
    ]
}

const reducer = (state = initialStates, action) => {

    switch (action.type) {
        case actionTypes.CREATE_BlOG:
            return { ...state, blogList: [...state.blogList, action.data] }
        default:
            return state;
    }
}

export default reducer;