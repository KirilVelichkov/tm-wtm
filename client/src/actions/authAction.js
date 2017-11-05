import axios from 'axios';
import cookie from 'react-cookies';

import * as actionTypes from '../actions/types';

const API_URL = 'http://localhost:1337';

export async function getLoggedUser(token) {
    const request = await axios.get(API_URL + '/auth/getLoggedUser', {
        headers: { Authorization: token }
    });

    return {
        type: actionTypes.AUTH_USER,
        payload: request
    };
}

export async function loginUser({ email, password }) {
    const request = await axios.post(API_URL + '/auth/login', { email, password });

    cookie.save('token', request.data.token);

    return {
        type: actionTypes.AUTH_USER,
        payload: request
    };
}

export async function registerUser({ email, username, password }) {
    const request = await axios.post(API_URL + '/auth/register', { email, username, password });

    cookie.save('token', request.data.token);

    return {
        type: actionTypes.AUTH_USER,
        payload: request
    };
}

export function logoutUser() {
    cookie.remove('token');

    return {
        type: actionTypes.UNAUTH_USER
    };
}



