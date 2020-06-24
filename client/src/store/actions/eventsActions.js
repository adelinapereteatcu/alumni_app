import { GET_EVENTS, ADD_EVENT, EVENTS_LOADING } from "./types";
import axios from 'axios';

export const getEvents = () => (dispatch, getState) => {
    dispatch(setEventsLoading());
    axios.get('/getEvents', tokenConfig(getState)).then(res => {
        //console.log(res.data);
        dispatch({
            type: GET_EVENTS,
            payload: res.data.allEvents //getting the allEvents array from json object from api
        })
    }
    )
}

export const setEventsLoading = () => {
    return {
        type: EVENTS_LOADING
    }
}

export const addEvent = () => (dispatch, getState) => {
    axios.post('/event', tokenConfig(getState)).then(res => {
        //console.log(res.data);
        dispatch({
            type: ADD_EVENT
        })
    }
    )
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