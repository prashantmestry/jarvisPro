import * as actionTypes from '../actionTypes';

const initialState = {
    allocation_data_loading: false,
    allocation_data_error: null,
    allocation_data: null,

    chartData: [],
    chartDataLoading: false,
    chartDataError: null,

    // asset_data_loading: false,
    // asset_data_error: null,
    // asset_data: null,
}

// Dynamic Asset Alloction Fund Data
const fetchDaafDataStart = (state) => {
    return {
        ...state,
        allocation_data_loading: true, allocation_data_error: null
    }
}
const fetchDaafDataSuccess = (state, action) => {
    return {
        ...state,
        allocation_data: action.data, allocation_data_loading: false, allocation_data_error: null
    }
}
const fetchDaafDataFail = (state, action) => {
    return {
        ...state,
        allocation_data: null, allocation_data_loading: false, allocation_data_error: action.error
    }
}

// Asset Data.
const fetchAllDaafChartsStart = (state) => {
    return {
        ...state,
        chartDataLoading: true,
        chartDataError: null
    }
}
const fetchAllDaafChartsSuccess = (state, action) => {
    return {
        ...state,
        chartData: action.data,
        chartDataLoading: false,
        chartDataError: null
    }
}
const fetchAllDaafChartsFail = (state, action) => {
    return {
        ...state,
        asset_data: [],
        chartDataLoading: false,
        chartDataError: action.data
    }
}


// const updateDaafChart = (state, action) => {
//     return {
//         ...state,
//         chartData: action.data
//     }
// }


// // Percentile Data.
// const fetchPercentileStart = (state) => {
//     return updateObject(state, { percentile_data_loading: true, percentile_data_error: null });
// }
// const fetchPercentileSuccess = (state, action) => {
//     return updateObject(state, { percentile_data: action.data, percentile_data_loading: false, percentile_data_error: null });
// }
// const fetchPercentileFail = (state, action) => {
//     return updateObject(state, { percentile_data: null, percentile_data_loading: false, percentile_data_error: action.data });
// }



// // Percentile Data.
// const fetchMomentumStart = (state) => {
//     return updateObject(state, {  momentum_data_loading: true, momentum_data_error: null });
// }
// const fetchMomentumSuccess = (state, action) => {
//     return updateObject(state, { momentum_data: action.data, momentum_data_loading: false, momentum_data_error: null });
// }
// const fetchMomentumFail = (state, action) => {
//     return updateObject(state, { momentum_data: null, momentum_data_loading: false, momentum_data_error: action.data });
// }




const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.FETCH_DAAF_DATA_START:
            return fetchDaafDataStart(state, action);
        case actionTypes.FETCH_DAAF_DATA_SUCCESS:
            return fetchDaafDataSuccess(state, action);
        case actionTypes.FETCH_DAAF_DATA_FAIL:
            return fetchDaafDataFail(state, action);

        case actionTypes.FETCH_DAAF_CHARTS_START:
            return fetchAllDaafChartsStart(state, action);
        case actionTypes.FETCH_DAAF_CHARTS_SUCCESS:
            return fetchAllDaafChartsSuccess(state, action);
        case actionTypes.FETCH_DAAF_CHARTS_FAIL:
            return fetchAllDaafChartsFail(state, action);

        // case actionTypes.UPDATE_DAAF_CHART:
        //     return updateDaafChart(state, action);

        // case actionTypes.FETCH_PERCENTILE_START:
        //     return fetchPercentileStart(state, action);
        // case actionTypes.FETCH_PERCENTILE_SUCCESS:
        //     return fetchPercentileSuccess(state, action);
        // case actionTypes.FETCH_PERCENTILE_FAIL:
        //     return fetchPercentileFail(state, action);

        // case actionTypes.FETCH_MOMENTUM_START:
        //     return fetchMomentumStart(state, action);
        // case actionTypes.FETCH_MOMENTUM_SUCCESS:
        //     return fetchMomentumSuccess(state, action);
        // case actionTypes.FETCH_MOMENTUM_FAIL:
        //     return fetchMomentumFail(state, action);

        default:
            return state;

    }

}




export default reducer;