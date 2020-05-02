import axios from 'axios';
import {returnErrors} from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//check token & load user
//get user data from token thanks to the id - routes/login
export const loadUser = () => (dispatch, getState) => {
    //user loading 
    dispatch({type: USER_LOADING});

    axios.get('/login/user', tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    })
}

//register user
export const register = ({ name, surname, date_of_birth, email, password, gender}) => dispatch =>{
    //headers
    const config = {
        headers :{
            'Content-Type' : 'application/json'
        }
    }
    //request body
    const body = JSON.stringify({ name, surname, date_of_birth, email, password, gender});

    axios.post('/register', body, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload:res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        });
    });
}

//login user
export const login = ({ email, password}) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //request body
    const body = JSON.stringify({  email, password });

    axios.post('/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}


//logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//setup config/headers and toke
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