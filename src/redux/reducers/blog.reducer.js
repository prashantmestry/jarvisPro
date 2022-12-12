import * as actionTypes from '../actionTypes';

const initialStates = {
    blogList: [
        { title: 'one', description: 'Here is my one blog', counter: 1 }
    ],

    cityList: [
        { city_id: '1', city_name: 'Mumbai' },
        { city_id: '2', city_name: 'Pune' },
        { city_id: '3', city_name: 'Punjab' },
        { city_id: '4', city_name: 'Bangalore' },
        { city_id: '5', city_name: 'Delhi' }
    ],
    chartList: [
        {
            id: 1001,
            title: 'Chart One',
            message: [
                { messageId: 10, data: 'Only message for 10' },
                { messageId: 11, data: 'Only message for 11' },
                { messageId: 12, data: 'Only message for 12' }
            ],
            locations: ['1', '2', '3']
        },
        {
            id: 1002,
            title: 'Chart Two',
            message: [
                { messageId: 100, data: 'This chart is only connected with Delhi 100' }
            ],
            locations: ['5']
        },
        {
            id: 1003,
            title: 'Chart Three',
            message: [
                { messageId: 200, data: 'Connected with Delhi stations 200' }
            ],
            locations: ['4', '5']
        }
    ],
    editMode: {
        chartId: null,
        messageId: null,
        title: null,
        message: null,
        locations: []
    }
}

let updateCharList = (state, action) => {
    return {
        ...state,
        ...action.data
    }
}

const reducer = (state = initialStates, action) => {

    switch (action.type) {
        case actionTypes.CREATE_BlOG:
            return { ...state, blogList: [...state.blogList, action.data] };
        case actionTypes.UPDATE_CHART_LIST:
            return updateCharList(state, action);
        default:
            return state;
    }
}

export default reducer;