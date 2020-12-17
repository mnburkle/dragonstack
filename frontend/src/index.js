import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Root from './components/Root';

import rootReducer from './reducers'; // reducers/index used by default
import './index.css';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

// removed call to store.subscribe , and initial fetch because now
// generation component is doing all that stuff by itself

// jsx syntax
render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);