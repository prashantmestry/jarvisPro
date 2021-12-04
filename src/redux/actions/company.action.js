import * as actionTypes from '../actionTypes';


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