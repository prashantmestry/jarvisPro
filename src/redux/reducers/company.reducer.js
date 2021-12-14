import * as actionsTypes from '../actionTypes';

const initialStates = {
    companyList: [],
    companyListLoading: false,
    companyInfo: {
        id: null,
        name: null,
        stmtType: null,
        stmtId: null
    }
}

const fetchCompanyListStart = (state, action) => {
    return {
        ...state,
        companyListLoading: true
    }
}

const fetchCompanyListSuccess = (state, action) => {
    return {
        ...state,
        companyList: action.data,
        companyListLoading: false
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
        case actionsTypes.FETCH_COMPANY_LIST_START:
            return fetchCompanyListStart(state, action);
        case actionsTypes.FETCH_COMPANY_LIST_SUCCESS:
            return fetchCompanyListSuccess(state, action);

        default:
            return state;
    }
}

export default reducer;