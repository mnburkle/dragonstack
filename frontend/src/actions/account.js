import { ACCOUNT } from './types';
import { BACKEND } from '../config';

const fetchFromAccount = ({ endpoint, options, SUCCESS_TYPE}) => {
}

export const signup = ({ username, password }) => dispatch => {
    dispatch({ type: ACCOUNT.FETCH });

    return fetch(`${BACKEND.ADDRESS}/account/signup`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
        if (json.type === 'error') {
            dispatch({ type: ACCOUNT.FETCH_ERROR, message: json.message });
        } else {
            dispatch({ type: ACCOUNT.FETCH_SUCCESS, ...json }); // mix in everything with spread operator 
        }
     })
    .catch(error => dispatch({ 
        type: ACCOUNT.FETCH_ERROR, message: error.message 
    })); // note this is a post req, need extra config for fetch method
};

export const logout = () => dispatch => {
    dispatch({ type: ACCOUNT.FETCH });

    return fetch(`${BACKEND.ADDRESS}/account/logout`, {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(json => {
        if (json.type === 'error') {
            dispatch({ type: ACCOUNT.FETCH_ERROR, message: json.message });
        } else {
            dispatch({ type: ACCOUNT.FETCH_LOGOUT_SUCCESS, ...json });
        }
    })
    .catch(error => dispatch({
        type: ACCOUNT.FETCH_ERROR, message: error.message
    }));
}