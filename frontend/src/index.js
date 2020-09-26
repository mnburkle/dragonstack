import React from 'react';
import { render } from 'react-dom';
import Generation from './components/Generation';
import Dragon from './components/Dragon';

// jsx syntax
render(
    <div>
        <h2>Dragon Stack from React</h2>
        <Generation />
        <Dragon />
    </div>,
    document.getElementById('root')
);