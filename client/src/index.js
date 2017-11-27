import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
// import cookie from 'react-cookies';

import App from './App';
import reducers from './reducers';
import { getLoggedUser, logoutUser } from './actions/authAction';
import './main.css';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
// const token = cookie.load('token');
const token = localStorage.getItem('token');

if (token) {
    store.dispatch(getLoggedUser(token));
} else {
    store.dispatch(logoutUser());
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
