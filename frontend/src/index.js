import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';

import Generation from './components/Generation';
import Dragon from './components/Dragon';

import { generationReducer } from './reducers'; // reducers/index used by default
import { generationActionCreator } from './actions/generation'; 
import './index.css';

const store = createStore(generationReducer);

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
    <div>
        <h2>Dragon Stack</h2>
        <Generation />
        <Dragon />
    </div>,
    document.getElementById('root')
);