import * as actionTypes from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {

        case actionTypes.AUTH_USER:
            console.log(1, state);
            console.log(2, action);
            return {
                ...state,
                isAuthenticated: true
            };

        case actionTypes.UNAUTH_USER:
            console.log(state);
            console.log(action);
            return {
                ...state,
                isAuthenticated: false
            };

        case 'TEST':
            console.log(action);
            return {
                a: '1'
            };

        default:
            return state;
    }
}