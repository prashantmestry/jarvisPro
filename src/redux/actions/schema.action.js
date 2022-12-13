import * as actionTypes from '../actionTypes';

export const updateSchemaDetail = (data) => {
    return {
        type: actionTypes.UPDATE_SCHEMA_DETAIL,
        data: data
    }
}

export const clearSchemaData = () => {
    return {
        type: actionTypes.CLEAR_SCHEMA_DATA
    }
}