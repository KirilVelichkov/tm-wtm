import axios from 'axios';

import * as actionTypes from '../actions/types';
import { API_URL } from '../components/Util/Constants';

export function getAllUsers() {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        axios.get(API_URL + '/admin/getAllUsers', {
            headers: { Authorization: token }
        })
            .then(result => {
                dispatch({
                    type: actionTypes.GET_ALL_USERS,
                    payload: result.data.users
                });
            });
    };
}

export function blockUser(id) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

       return axios.post(API_URL + '/admin/blockUser',
            { id },
            {
                headers: { Authorization: token }
            })
            .then(result => {
                dispatch({
                    type: actionTypes.BLOCK_USER,
                    payload: result.data.message
                });
            });
    };
}

export function unblockUser(id) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return axios.post(API_URL + '/admin/unblockUser',
            { id },
            {
                headers: { Authorization: token }
            })
            .then(result => {
                dispatch({
                    type: actionTypes.BLOCK_USER,
                    payload: result.data.message
                });
            });
    };
}

export function setAdmin(id) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return axios.post(API_URL + '/admin/setAdmin',
            { id },
            {
                headers: { Authorization: token }
            })
            .then(result => {
                dispatch({
                    type: actionTypes.SET_ADMIN,
                    payload: result.data.message
                });
            });
    };
}

export function unsetAdmin(id) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return axios.post(API_URL + '/admin/unsetAdmin',
            { id },
            {
                headers: { Authorization: token }
            })
            .then(result => {
                dispatch({
                    type: actionTypes.SET_ADMIN,
                    payload: result.data.message
                });
            });
    };
}

export function resetUserPassword(id) {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        return axios.post(API_URL + '/admin/resetUserPassword',
            { id },
            {
                headers: { Authorization: token }
            })
            .then(result => {
                dispatch({
                    type: actionTypes.RESET_PASSWORD,
                    payload: result.data.message
                });
            });
    };
}