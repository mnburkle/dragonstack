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

    if (action.type === 'GENERATION_ACTION_TYPE') {
        return { generation: action.generation };
    }

    // return object representing section of a store where generation object located
    return {
        generation: DEFAULT_GENERATION
    };
};

const store = createStore(generationReducer);


store.dispatch({ type: 'foo' });

// type, generation payload
store.dispatch({ 
    type: 'GENERATION_ACTION_TYPE' ,
    generation: { generation: 'goo', expiration: 'bar'}
});

console.log('store get state at the end', store.getState());

// jsx syntax
render(
    <div>
        <h2>Dragon Stack</h2>
        <Generation />
        <Dragon />
    </div>,
    document.getElementById('root')
);