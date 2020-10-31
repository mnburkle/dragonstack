import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Generation from './components/Generation';
import Dragon from './components/Dragon';

import { generationReducer } from './reducers'; // reducers/index used by default
import { generationActionCreator } from './actions/generation'; 
import './index.css';

const store = createStore(
    generationReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// gotta do this before the dispatch. need to register with redux
// before actions are dispatched
store.subscribe(() => {
    console.log('store state update', store.getState());
});

fetch('http://localhost:3000/generation')
    .then(response => {
        response.json()
            .then(json => {
                store.dispatch(generationActionCreator(json.generation));
            });
    });

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