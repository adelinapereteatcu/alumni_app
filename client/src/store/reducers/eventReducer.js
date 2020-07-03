import { 
    GET_EVENTS,
    ADD_EVENT, 
    EVENTS_LOADING, 
    EVENTS_ERROR,
    LOADING_ADDING_EVENT
 } from "../actions/types";

const initialState = {
    events: [],
    token: localStorage.getItem('token'),
    loading: false,
    eventAdded: false
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false
            }
        case ADD_EVENT:
            return {
                ...state,
                eventAdded: true
            }
        case EVENTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOADING_ADDING_EVENT:
            return {
                ...state,
                eventAdded: false
            }
        case EVENTS_ERROR:
            return {
                ...state,
                loading: false,
                eventAdded: false
            }
        default:
            return state;
    }
}