import * as actionTypes from '../actions/types';



export default function (state = {}, action) {
    switch (action.type) {

        case actionTypes.GET_ALL_IMAGES:
            return {
                ...state,
                all: action.payload
            };

        case actionTypes.SET_SELECTED_IMAGE:
            return {
                ...state,
                selectedAvatar: action.payload
            };

        default:
            return state;
    }
}