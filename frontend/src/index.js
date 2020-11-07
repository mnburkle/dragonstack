import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Generation from './components/Generation';
import Dragon from './components/Dragon';

import { generationReducer } from './reducers'; // reducers/index used by default
import './index.css';

const store = createStore(
    generationReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

// removed call to store.subscribe , and initial fetch because now
// generation component is doing all that stuff by itself

// jsx syntax
render(
    <Provider store={store}>
        <div>
            <h2>Dragon Stack</h2>
            <Generation />
            <Dragon />
        </div>
    </Provider>,
    document.getElementById('root')
);