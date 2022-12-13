import * as actionTypes from '../actionTypes';

const initialState = {
    schemaName: '',
    entity: [],
    defaultForSector: false,
    defaultForUser: false,
    scope: {
        visibility: 'private',
        users: []
    },
    saving: false
}

const updateSchemaDetail = (state, action) => {
    return {
        ...state, ...action.data
    }
}

const clearSchemaData = (state, action) => {
    return (state, { ...initialState });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_SCHEMA_DETAIL:
            return updateSchemaDetail(state, action);
        case actionTypes.CLEAR_SCHEMA_DATA:
            return clearSchemaData(state, action);
        default:
            return state;
    }
}

export default reducer;