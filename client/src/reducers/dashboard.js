import { DASHBOARD_GET_DATA } from '../actions/action-types/types';

const DEFAULT_STATE = {
    dashboard: '',
}

export default(state= DEFAULT_STATE, action) => {
    switch(action.type){
        case DASHBOARD_GET_DATA:
            return {
                ...state,                
                dashboard: action.payload,
                
            }
        

        default:
             return state
    }
    
}

