import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import alumniReducer from './alumniReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    error:errorReducer,
    auth:authReducer,
    alumni: alumniReducer,
    users: usersReducer
});