import { GET_USERS, ADD_USERS, DELETE_USERS, USERS_LOADING } from "../actions/types";
import axios from 'axios';

export const getUsers = () => (dispatch, getState) => {
    dispatch(setUsersLoading());
    axios.get('/getUsers', tokenConfig(getState)).then(res => {
        //console.log("GET USERS"+res.data);
        dispatch({
            type: GET_USERS,
            payload: res.data.users //geting the alumni array from json object from api
        })
    }
    )
}
// export const getAlumni = () => {
//     return {
//         type: GET_ALUMNI,

//     }
// }

export const deleteUsers = (id) => {
    return {
        type: DELETE_USERS,
        payload: id //or CNP?
    }
}

export const addUsers = (users) => {
    return {
        type: ADD_USERS,
        payload: users
    }
}

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    }
}

//setup config/headers and token
export const tokenConfig = getState => {
    //get token from localstorage
    const token = getState().auth.token;

    //headers 
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //if token, add to header
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
