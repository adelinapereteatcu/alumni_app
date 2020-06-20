import { GET_ALUMNI, ADD_ALUMNI, DELETE_ALUMNI, ALUMNI_LOADING } from "./types";
import axios from 'axios';

export const getAlumni = () => (dispatch, getState) => {
    dispatch(setAlumniLoading());
    axios.get('/getAlumni', tokenConfig(getState)).then(res => {
        //console.log(res.data);
        dispatch({
            type: GET_ALUMNI,
            payload: res.data.alumni //geting the alumni array from json object from api
        })
    }
    )
}
// export const getAlumni = () => {
//     return {
//         type: GET_ALUMNI,

//     }
// }

export const deleteAlumni = (id) => {
    return {
        type: DELETE_ALUMNI,
        payload: id //or CNP?
    }
}

export const addAlumni = (alumni) => {
    return {
        type: ADD_ALUMNI,
        payload: alumni
    }
}

export const setAlumniLoading = () => {
    return {
        type: ALUMNI_LOADING
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
