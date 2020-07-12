import {
    DETAILS_ERROR, ADD_DETAILS, LOADING_ADDING_DETAILS, DETAILS_LOADING,
    GET_DETAILS
} from "./types";
import axios from 'axios';
import { returnErrors } from './errorActions';

export const setLoadingAddingDetails = () => {
    return {
        type: LOADING_ADDING_DETAILS
    }
}

export const setLoadingDetails = () => {
    return {
        type: DETAILS_LOADING
    }
}

export const getDetails = (cnp) => (dispatch, getState) => {
    dispatch(setLoadingDetails());
    
    axios.get('/details/' + cnp, tokenConfig(getState)).then(res => {
        console.log(res.data);
        dispatch({
            type: GET_DETAILS,
            payload: res.data //geting the users array from json object from api
        })
    }
    )
}

export const addDetails = ({ cnp, current_position, company, country, city }) => (dispatch) => {
    console.log("INSIDE ADD DETAILS ACTIONS");
    dispatch(setLoadingAddingDetails());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    //we are taking a javaScript object and we want to turn it into JSON
    const body = JSON.stringify({ cnp, current_position, company, country, city });

    console.log("HERE IS THE BODY");
    console.log(body);

    axios.post('/details', body, config)
        .then(res => {
            console.log("HERE IS res.data");
            console.log(res.data);
            dispatch({
                type: ADD_DETAILS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'DETAILS_ERROR'));
            dispatch({
                type: DETAILS_ERROR
            })
        })
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