import {
    GET_EVENTS,
    ADD_EVENT,
    EVENTS_LOADING,
    EVENTS_ERROR,
    LOADING_ADDING_EVENT
} from "./types";
import axios from 'axios';
import { returnErrors } from './errorActions';

export const getEvents = () => (dispatch, getState) => {
    dispatch(setEventsLoading());

    axios.get('/event', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_EVENTS,
            payload: res.data.allEvents //getting the allEvents array from json object from api
        }))
}

export const setEventsLoading = () => {
    return {
        type: EVENTS_LOADING
    }
}

export const setLoadingAddingEvent = () => {
    return {
        type: LOADING_ADDING_EVENT
    }
}

export const addEvent = ({ cnp, event_name, location, description }) => (dispatch) => {
    dispatch(setLoadingAddingEvent());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    //we are taking a javaScript object and we want to turn it into JSON
    const body = JSON.stringify({ cnp, event_name, location, description });
    console.log(body);

    axios.post('/event', body, config)
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: ADD_EVENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'EVENTS_ERROR'));
            dispatch({
                type: EVENTS_ERROR
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