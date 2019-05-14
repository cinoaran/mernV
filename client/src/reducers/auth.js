import { 
    AUTH_SIGN_UP, 
    AUTH_SIGN_OUT, 
    AUTH_ERROR, 
    AUTH_SIGN_IN } from '../actions/action-types/types';

const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    errorMessage: ''
}

export default(state= DEFAULT_STATE, action) => {
    switch(action.type){
        case AUTH_SIGN_UP:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
                errorMessage: ''
            }
        case AUTH_SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
                errorMessage: ''
            }            
        case AUTH_ERROR:
                   
            return {
                ...state,
                errorMessage: action.payload
            }
        case AUTH_SIGN_OUT:
                
            return {
                ...state,
                isAuthenticated: false,
                token: action.payload,
                errorMessage: ''
            }

        default:
             return state
    }
    
}