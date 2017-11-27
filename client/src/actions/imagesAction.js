import axios from 'axios';

import * as actionTypes from '../actions/types';
import { API_URL } from '../components/Util/Constants';

export function getAllImages() {
    return function (dispatch) {
        axios.get(API_URL + '/images/all')
            .then(result => {
                dispatch({
                    type: actionTypes.GET_ALL_IMAGES,
                    payload: result.data.images
                });
             });
    };
}

export function setSelectedAvatar(avatar) {
    return {
        type: actionTypes.SET_SELECTED_IMAGE,
        payload: avatar
    };
}
