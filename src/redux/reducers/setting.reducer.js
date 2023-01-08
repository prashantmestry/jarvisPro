import { UPDATE_SETTING_DATA } from '../actionTypes';

const initialState = {
    notificationDrawerOpen: false
}

const updateSettingSuccess = (state, action) => {
    return { ...state, ...action.data }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_SETTING_DATA:
            return updateSettingSuccess(state, action)
        default:
            return state
    }

}

export default reducer;