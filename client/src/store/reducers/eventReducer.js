import { GET_EVENTS, ADD_EVENT } from "..actions/types";

const initialState = {
    events: [],
    loading: false
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
                ...state
            }
        case EVENTS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}