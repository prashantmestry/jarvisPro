import * as actionTypes from '../actionTypes';
import { allocation_data } from '../../Json/Daaf/allocation_data';
import { asset_data } from '../../Json/Daaf/asset_data';

import { percentile_data } from '../../Json/Daaf/percentile_data';
import { momentum_data } from '../../Json/Daaf/momentum_data';

const fetchDaafDataStart = () => {
    return {
        type: actionTypes.FETCH_DAAF_DATA_START
    }
}
const fetchDaafDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_DAAF_DATA_SUCCESS,
        data: data
    }
}
const fetchDaafDataFail = (error) => {
    return {
        type: actionTypes.FETCH_DAAF_DATA_FAIL,
        error: error
    }
}

export const fetchDaafData = (data) => {
    return dispatch => {
        dispatch(fetchDaafDataStart());
        setTimeout(() => {
            dispatch(fetchDaafDataSuccess(allocation_data));
            //dispatch(fetchDaafDataFail('Oops!! Data Not Found. Please try again!!!'));
        }, 1000)
    }
}


// Asset Data
const fetchAllDaafChartsStart = () => {
    return {
        type: actionTypes.FETCH_DAAF_CHARTS_START,
    }
}
const fetchAllDaafChartsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_DAAF_CHARTS_SUCCESS,
        data: data
    }
}
const fetchAllDaafChartsFail = (error) => {
    return {
        type: actionTypes.FETCH_DAAF_CHARTS_FAIL,
        data: error
    }
}

function getAssetChartData(obj) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {            
            resolve({
                ...obj.data,
                title: obj.id
            });
        }, obj.time)
    })
}

export const fetchAllDaafCharts = () => {
    return dispatch => {
        dispatch(fetchAllDaafChartsStart());    
        let chartArray = [
            { id: 'assset', data: asset_data, time: 1000 },
            { id: 'percentile', data: percentile_data, time: 500 },
            { id: 'momentum', data: momentum_data, time: 1000 }
        ];
        let promiseList = [];
        chartArray.forEach(element => {
            promiseList.push(getAssetChartData(element))
        });

        Promise.allSettled(promiseList).then(result => {            
            let output = [];
            result.forEach(val => {
                if (val.status === 'fulfilled') {
                    output.push(val.value);
                }
            })
            dispatch(fetchAllDaafChartsSuccess(output));
            //fetchAllDaafChartsFail('error in fetching chart data')        
        });
    }
}

