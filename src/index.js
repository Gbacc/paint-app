import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware  } from "redux";
import registerServiceWorker from './registerServiceWorker';
import Modal from 'react-modal';

import './index.scss';

import App from './app';
import allReducers from './reducers/';

Modal.setAppElement('#root')

const store = createStore(
    allReducers,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
