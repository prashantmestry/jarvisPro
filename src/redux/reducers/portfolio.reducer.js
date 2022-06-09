import * as actionTypes from '../actionTypes';

const initialStates = {
    portfolioList: [],
    portfoliolistLoading: false,
    portfoliolistError: null,
    userRating: [{ rating_agency: null, rating_type: null, rating_value: null }],
    ratingAll: {
        "rating_agency": [
            {
                "value": "Crisil Ltd."
            },
            {
                "value": "ICRA"
            },
            {
                "value": "CARE"
            },
            {
                "value": "FITCH"
            },
            {
                "value": "BWR"
            }
        ],
        "rating_type": [
            {
                "Short Term": {
                    "rating_value": [
                        {
                            "value": "A1+",
                            "order": 1
                        },
                        {
                            "value": "A1",
                            "order": 2
                        }
                    ]
                },
                "Long Term": {
                    "rating_value": [
                        {
                            "value": "AAA",
                            "order": 1
                        },
                        {
                            "value": "AA+",
                            "order": 2
                        },
                        {
                            "value": "AA",
                            "order": 3
                        },
                        {
                            "value": "AA-",
                            "order": 4
                        },
                        {
                            "value": "A+",
                            "order": 5
                        },
                        {
                            "value": "A",
                            "order": 6
                        },
                        {
                            "value": "A-",
                            "order": 7
                        },
                        {
                            "value": "BBB+",
                            "order": 8
                        },
                        {
                            "value": "BBB",
                            "order": 9
                        },
                        {
                            "value": "BBB-",
                            "order": 10
                        },
                        {
                            "value": "BB",
                            "order": 11
                        }
                    ]
                }
            }
        ],
        "group_comfort": [
            {
                "value": "Strong"
            },
            {
                "value": "Moderate"
            },
            {
                "value": "Weak"
            }
        ],
        "internal_comfort": [
            { "value": 1 },
            { "value": 2 },
            { "value": 3 },
            { "value": 4 }
        ]
    }
}

const reducer = (state = initialStates, action) => {

    switch (action.type) {
        case actionTypes.PORTFOLIO_LIST_START:
            return { ...state, portfoliolistLoading: true, portfoliolistError: false }
        case actionTypes.PORTFOLIO_LIST_SUCCESS:
            return { ...state, portfoliolistLoading: false, portfoliolistError: action.data }
        case actionTypes.PORTFOLIO_LIST_FAIL:
            return { ...state, portfoliolistLoading: false, portfoliolistError: action.error }
        case actionTypes.PORTFOLIO_UPDATE_DETAIL:
            return { ...state, ...action.data }


        default:
            return state;
    }
}

export default reducer;