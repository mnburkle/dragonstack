import React, { Component } from 'react'; 

// inherits a bunch of methods and features from component
class Generation extends Component {
    // equivalent to setting "this.state" within a constructor
    state = { generation: { generationId: -1, expiration: '2021-01-01' } };

    // so these are like hooks i guess
    componentDidMount() {
        this.fetchGeneration();
    }
    
    fetchGeneration = () => {
        // special function exposed for javascript, pass in url, returns a promise
        fetch('http://localhost:3000/generation')
            .then((response) => {
                console.log('response', response); 
            });
    };

    // we have to have this
    render() {
        // describe component structure of this component through jsx
        const { generation } = this.state;
        // ^ destructuring syntax equivalent to const generation = this.state.generation;

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