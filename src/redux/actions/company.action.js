import * as actionTypes from '../actionTypes';
import { companyList } from '../../Utils/GlobalData';

const fetchCompanyListStart = () => {
    return {
        type: actionTypes.FETCH_COMPANY_LIST_START
    }
}
const fetchCompanyListSuccess = (data) => {
    return {
        type: actionTypes.FETCH_COMPANY_LIST_SUCCESS,
        data: data
    }
}

export const getCompanyList = () => {
    return dispatch => {
        dispatch(fetchCompanyListStart());
        setTimeout(() => {
            dispatch(fetchCompanyListSuccess(companyList));
        }, 1000);
    }
}

const setCompanyInfo = (data) => {
    return {
        type: actionTypes.SET_COMPANY_INFO,
        companyInfo: data
    }
}

export const updateCompanyInfo = (data) => {
    return dispatch => {
        dispatch(setCompanyInfo(data))
    }
}