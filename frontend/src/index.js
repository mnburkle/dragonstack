import React from 'react';
import { render } from 'react-dom';
import './index.css';

import Generation from './components/Generation';
import Dragon from './components/Dragon';

// jsx syntax
render(
    <div>
        <h2>Dragon Stack</h2>
        <Generation />
        <Dragon />
    </div>,
    document.getElementById('root')
);