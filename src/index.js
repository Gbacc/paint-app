import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware  } from "redux";
import registerServiceWorker from './registerServiceWorker';

import 'spectre.css/dist/spectre.css';
import 'spectre.css/dist/spectre-icons.css';

import PaintTemplateList from './containers/paintTemplateList';
import allReducers from './reducers/';

const store = createStore(
    allReducers,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <PaintTemplateList />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();