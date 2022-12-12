import { jarvisFastApiAxios } from '../../axiosConfig';
import * as actionsTypes from '../actionTypes';


let portfolioListFetchStart = () => {
    return {
        type: actionsTypes.PORTFOLIO_LIST_START
    }
}

let portfolioListFetchSuccess = (data) => {
    return {
        type: actionsTypes.PORTFOLIO_LIST_SUCCESS,
        data: data
    }
}

let portfolioListFetchFail = (error) => {
    return {
        type: actionsTypes.PORTFOLIO_LIST_FAIL,
        error: error
    }
}

export const updatePortfolioDetail = (data) => {
    return {
        type: actionsTypes.PORTFOLIO_UPDATE_DETAIL,
        data: data
    }
}


export let getportfolioList = () => {

    return dispatch => {
        let url = '/portfolio';
        const headers = { 'Content-Type': 'application/json' };
        jarvisFastApiAxios.post(url, { headers: headers }).then(res => {
            console.log('list ', res.data);
        }).catch(error => {
            console.log('error is ', error);
        });

    }
}