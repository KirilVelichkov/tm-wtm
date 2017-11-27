import axios from 'axios';

import * as actionTypes from '../actions/types';
import { API_URL } from '../components/Util/Constants';

export function getLoggedUser(token) {
    return function (dispatch) {
        axios.get(API_URL + '/auth/getLoggedUser', {
            headers: { Authorization: token }
        }).then(result => {
            dispatch({
                type: actionTypes.AUTH_USER,
                payload: { user: result.data.user }
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.UNAUTH_USER
            });
        });


    };
}

export function loginUser({ email, password }) {
    return function (dispatch) {
        axios.post(API_URL + '/auth/login', { email, password })
            .then(result => {
                localStorage.setItem('token', result.data.token);
                dispatch({
                    type: actionTypes.AUTH_USER,
                    payload: {
                        user: result.data.user
                    }
                });
            })
            .catch(() => {
                dispatch({
                    type: actionTypes.BAD_REQUEST,
                });
            });
    };
}

export function registerUser({ email, username, password, isAdmin }) {
    const token = localStorage.getItem('token');
    return function (dispatch) {
        axios.post(API_URL + '/auth/register', { email, username, password, isAdmin }, {
            headers: { Authorization: token }
        }).then((result) => {
            dispatch({
                type: actionTypes.AUTH_USER,
                payload: { message: result.data.message }
            });
            }).catch(data => {
                const result = JSON.parse(JSON.stringify(data));
                const { message } = result.response.data;
                
                dispatch({
                    type: actionTypes.BAD_REQUEST,
                    payload: message
                });
                
        });
    };
}

export function logoutUser() {
    localStorage.removeItem('token');

    return {
        type: actionTypes.UNAUTH_USER,
        payload: {}
    };
}



