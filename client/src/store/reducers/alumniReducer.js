import { GET_ALUMNI, ADD_ALUMNI, DELETE_ALUMNI, ALUMNI_LOADING, GET_ALUMNI_BY_YEAR } from "../actions/types";

const initialState = {
    alumni: [],
    loading: false,
    token: localStorage.getItem('token'),
    resultArr:[]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALUMNI:
            return {
                ...state,
                alumni: action.payload,
                loading: false
            }
        case GET_ALUMNI_BY_YEAR:
            return {
                ...state,
                resultArr: action.payload,
                loading: false
            }
        case DELETE_ALUMNI:
            return {
                ...state
            }
        case ADD_ALUMNI:
            return {
                ...state
            }
        case ALUMNI_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}