import {
    DETAILS_ERROR, 
    ADD_DETAILS, 
    LOADING_ADDING_DETAILS,
    DETAILS_LOADING,
    GET_DETAILS
} from "../actions/types";

const initialState = {
    currentJob: [],
    currentResidence: [],
    loading: false,
    detailsAdded: false,
    detailsLoading: false,
    token: localStorage.getItem('token')
}


export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_DETAILS:
            return {
                ...state,
                detailsAdded: true
            }
        case GET_DETAILS:
            return {
                ...state,
                currentJob: action.payload.currentJob,
                currentResidence: action.payload.currentResidence,
                detailsLoading: false
            }
        case LOADING_ADDING_DETAILS:
            return {
                ...state,
                detailsAdded: false
            }
        case DETAILS_LOADING:
            return {
                ...state,
                detailsLoading: true
            }
        case DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                detailsAdded: false
            }
        default:
            return state;
    }
}