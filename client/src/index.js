import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

import authGuard from './components/HOCs/authGuard';

import reducers from './reducers';

const jwtToken = localStorage.getItem('JWT_TOKEN');

const store = createStore(reducers, {
        auth:{
            token: jwtToken,
            isAuthenticated: jwtToken ? true: false
        }
    },
    compose(
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
)

axios.defaults.headers.common['Authorization'] = jwtToken;


ReactDOM.render(
    <Provider store= {store}>
    <BrowserRouter>
        <App>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/dashboard" component={authGuard(Dashboard)} />
        </App>
    </BrowserRouter>
    </Provider>
    , document.querySelector('#root'));


registerServiceWorker();
