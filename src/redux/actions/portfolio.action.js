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


export let getportfolioList = () => {

    return dispatch => {

        //dispatch(portfolioListFetchStart());
        //http://internal-a6105c1885b224b5d8404a4c1370d73e-385165692.ap-south-1.elb.amazonaws.com/api

        let url = '/portfolio';
        const headers = { 'Content-Type': 'application/json' };
        jarvisFastApiAxios.post(url, { headers: headers }).then(res => {
            console.log('list ', res.data);
        }).catch(error => {
            console.log('error is ', error);
        });

    }
}