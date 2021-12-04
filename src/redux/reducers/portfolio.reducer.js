import * as actionTypes from '../actionTypes';

const initialStates = {
    portfolioList: [],
    portfoliolistLoading: false,
    portfoliolistError: null    
}

const reducer = (state = initialStates, action) => {

    switch (action.type) {
        case actionTypes.PORTFOLIO_LIST_START:
            return { ...state, portfoliolistLoading: true, portfoliolistError: false }
        case actionTypes.PORTFOLIO_LIST_SUCCESS:
            return { ...state, portfoliolistLoading: false, portfoliolistError: action.data }
        case actionTypes.PORTFOLIO_LIST_FAIL:
            return { ...state, portfoliolistLoading: false, portfoliolistError: action.error }

        default:
            return state;
    }
}

export default reducer;