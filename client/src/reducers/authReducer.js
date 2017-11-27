import * as actionTypes from '../actions/types';

export default function (state = {}, action) {

    switch (action.type) {

        case actionTypes.AUTH_USER:
            localStorage.setItem('isLogged', true);    
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                successMessage: action.payload.message,
                invalidRegister: false,
                invalidLogind:false
            };

        case actionTypes.UNAUTH_USER:
            localStorage.removeItem('isLogged');    
            return {
                ...state,
                user: false,
                isAuthenticated: false
            };

        case actionTypes.BAD_REQUEST:
            return {
                ...state,
                invalidLogin: true,
                invalidRegister: true,
                errorMessage: action.payload
            };

        default:
            return state;
    }
}