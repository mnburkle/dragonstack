import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';

import Generation from './components/Generation';
import Dragon from './components/Dragon';

import './index.css';

const DEFAULT_GENERATION = { generationId: '', expiration: ''};

const generationReducer = (state, action) => {
    console.log('generationreducer state', state);
    console.log('generationreducer action', action);

    // return object representing section of a store where generation object located
    return {
        generation: DEFAULT_GENERATION
    };
};

const store = createStore(generationReducer);


store.dispatch({ type: 'foo' });

// jsx syntax
render(
    <div>
        <h2>Dragon Stack</h2>
        <Generation />
        <Dragon />
    </div>,
    document.getElementById('root')
);