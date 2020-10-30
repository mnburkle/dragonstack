import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';

import Generation from './components/Generation';
import Dragon from './components/Dragon';

import './index.css';

const DEFAULT_GENERATION = { generationId: '', expiration: ''};
const GENERATION_ACTION_TYPE = 'GENERATION_ACTION_TYPE';

const generationReducer = (state, action) => {
    if (action.type === GENERATION_ACTION_TYPE) {
        return { generation: action.generation };
    }

    // return object representing section of a store where generation object located
    return {
        generation: DEFAULT_GENERATION
    };
};

const store = createStore(generationReducer);

// gotta do this before the dispatch. need to register with redux
// before actions are dispatched
store.subscribe(() => {
    console.log('store state update', store.getState());
});

console.log('store', store);

store.dispatch({ type: 'foo' });

// type, generation payload
store.dispatch({ 
    type: GENERATION_ACTION_TYPE ,
    generation: { generation: 'goo', expiration: 'bar'}
});

console.log('store get state at the end', store.getState());

// generation data that will be placed within action object
// action creator is not the action itself
// the inner object it returns is action
// this is wrapper around action. 
const generationActionCreator = (payload) => {
    return {
        type: GENERATION_ACTION_TYPE,
        generation: payload
    };
}

const zooAction = generationActionCreator({
    generationId: 'zoo',
    expiration: 'bar'
});

store.dispatch(zooAction);

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