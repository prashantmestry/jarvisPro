import * as actionsTypes from '../actionTypes';

const initialStates = {
    companyInfo: {
        id: null,
        name: null,
        stmtType: null,
        stmtId: null
    }
}

const setCompanyInfo = (state, action) => {    

    return {
        ...state,
        companyInfo: {
            ...state.companyInfo,
            ...action.companyInfo
        }
    }
}

const reducer = (state = initialStates, action) => {

    switch (action.type) {
        case actionsTypes.SET_COMPANY_INFO:
            return setCompanyInfo(state, action);

        default:
            return state;
    }
}

export default reducer;