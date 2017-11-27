import * as actionTypes from '../actions/types';

export default function (state = {}, action) {

    switch (action.type) {

        case actionTypes.GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            };

        case actionTypes.BLOCK_USER:
            return {
                ...state,
                setBlockedMessage: action.payload
            };
            
        case actionTypes.SET_ADMIN:
            return {
                ...state,
                setAdminMessage: action.payload
            };  
            
        case actionTypes.RESET_PASSWORD:
            return {
                ...state,
                resetPasswordMessage: action.payload
            };

        default:
            return state;
    }
}