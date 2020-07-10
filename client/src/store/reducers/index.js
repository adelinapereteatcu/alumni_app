import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import alumniReducer from './alumniReducer';
import usersReducer from './usersReducer';
import eventReducer from './eventReducer';
import detailsReducer from './detailsReducer';

export default combineReducers({
    error:errorReducer,
    auth:authReducer,
    alumni: alumniReducer,
    users: usersReducer,
    events: eventReducer,
    details: detailsReducer
});