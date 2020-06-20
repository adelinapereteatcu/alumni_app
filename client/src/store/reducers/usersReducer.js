import { GET_USERS, ADD_USERS, DELETE_USERS, USERS_LOADING } from "../actions/types";

const initialState = {
    users: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case DELETE_USERS:
            return {
                ...state
            }
        case ADD_USERS:
            return {
                ...state
            }
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}