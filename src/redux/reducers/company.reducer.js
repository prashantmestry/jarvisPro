import * as actionsTypes from '../actionTypes';
import moment from 'moment';

const initialStates = {
    companyList: [],
    companyListLoading: false,
    companyInfo: {
        id: null,
        name: null,
        stmtType: 'sa',
        stmtId: 1,
        frequency: 'annually',
        selectDateType: 'dateSlider',
        // startDate: new Date().getFullYear(),
        // endDate: new Date().getFullYear(),
        dateRange: [new Date().getFullYear(), new Date().getFullYear()],
        specificDate: []
    },
    statementTableData: {
        1: {
            loading: false,
            error: null,
            data: {}
        }
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

const setCompanyStmtData = (state, action) => {
    return {
        ...state,
        statementTableData: {
            ...state.statementTableData,
            ...action.statementTableData

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
        case actionsTypes.SET_COMPANY_STMT_DATA:
            return setCompanyStmtData(state, action);

        default:
            return state;
    }
}

export default reducer;