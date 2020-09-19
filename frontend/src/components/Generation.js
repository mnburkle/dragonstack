import React, { Component } from 'react'; 

// inherits a bunch of methods and features from component
class Generation extends Component {
    // we have to have this
    render() {
        // describe component structure of this component through jsx
        const generation = { generationId: -1, expiration: '2021-01-01'}
        return (
            <div>
                <h3>Generation {generation.generationId}. Expires on:</h3>
                <h4>{new Date(generation.expiration).toString()}</h4>
            </div>
        );
    }
}

// share stuff, so instead of exporting we will do
export default Generation;