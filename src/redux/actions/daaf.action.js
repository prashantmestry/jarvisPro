import * as actionTypes from '../actionTypes';
import { allocation_data } from '../DummyJson/Daaf/allocation_data';
import { asset_data } from '../DummyJson/Daaf/asset_data';

// import { percentile_data } from '../../components/dynamic_asset_fund/raw/percentile_data';
// import { momentum_data } from '../../components/dynamic_asset_fund/raw/momentum_data';

const fetchDaafDataStart = () => {
    return {
        type: actionTypes.FETCH_DAAF_DATA_START,
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
const fetchAssetStart = () => {
    return {
        type: actionTypes.FETCH_ASSET_START,
    }
}
const fetchAssetSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ASSET_SUCCESS,
        data: data
    }
}
const fetchAssetFail = (error) => {
    return {
        type: actionTypes.FETCH_ASSET_FAIL,
        data: error
    }
}
export const fetchAssetGraphData = () => {
    return dispatch => {
        dispatch(fetchAssetStart());
        setTimeout(() => {
            dispatch(fetchAssetSuccess(asset_data));
            //dispatch(fetchAssetFail('Some Problem In Asset Data...'));
        }, 1000)
    }
}
