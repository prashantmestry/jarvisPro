import { UPDATE_SETTING_DATA } from '../actionTypes';


const updateSettingSuccess = (data) => {
    console.log('here we go');
    return {
        type: UPDATE_SETTING_DATA,
        data: data
    }
}


export const updateSetting = (dataObject) => {

    return dispatch => {
        return dispatch(updateSettingSuccess(dataObject));
    }
}