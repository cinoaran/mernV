import axios from 'axios';
import { 
    AUTH_SIGN_UP, 
    AUTH_SIGN_OUT, 
    AUTH_ERROR,     
    DASHBOARD_GET_DATA, 
    AUTH_SIGN_IN } from './action-types/types';


export const signUp = (data) => {
    
    return async (dispatch) => {
        /*
            step 1 ) Use the data and make HTTP request to our BackEnd and send it along [x]
            step 2 ) take the BE response (jwtToken is here now) [x]
            step 3 ) Dispatch user just signed up (with jwt token) [x]
            step 4 ) Save the jwtToken into localStorage [x]
        */

        try{
            
            const res = await axios.post('/auth/signup', data)
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;

        }catch(error){
         
            const serverError =  (error.response.data.serverMsg) ? error.response.data.serverMsg : error.response.data.details[0].message         
            dispatch({
                type: AUTH_ERROR,
                payload: serverError
            })
            
        }
    }

}

export const signIn = (data) => {
    
    return async (dispatch) => {
        /*
            step 1 ) Use the data and make HTTP request to our BackEnd and send it along [x]
            step 2 ) take the BE response (jwtToken is here now) [x]
            step 3 ) Dispatch user just signed up (with jwt token) [x]
            step 4 ) Save the jwtToken into localStorage [x]
        */

        try{
            
            const res = await axios.post('/auth/signin', data)
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            })

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;

        }catch(error){
         
            //const serverError =  (error.response.data.serverMsg) ? error.response.data.serverMsg : error.response.data.details[0].message         
            dispatch({
                type: AUTH_ERROR,
                payload: 'Credentials don\'t pass'
            })
            
        }
    }

}

export const oauthGoogle = data => {

    return async dispatch => {
        
        const res = await axios.post('/auth/oauth/google', {
            access_token: data
        });
        
        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
    }

}

export const oauthFacebook = data => {

    return async dispatch => {
        
        const res = await axios.post('/auth/oauth/facebook', {
            access_token: data
        });
        
        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
    }

}

export const getDashBoard = () => {

     return async dispatch => {
            try{
            
                const res = await axios.get('/auth/dashboard');
                
                
                dispatch({
                    type: DASHBOARD_GET_DATA,
                    payload: res.data.dashboard
                });

                
            }catch(err){
                console.log(err)
            }

        }
    }
export const signOut = () => {
    
    return dispatch => {

        localStorage.removeItem('JWT_TOKEN');

        axios.defaults.headers.common['Authorization'] = '';

        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        });
    }

}