import React, { Component } from 'react'; 

const DEFAULT_GENERATION = { generationId: '', expiration: '' };
const MINIMUM_DELAY = 3000;

// inherits a bunch of methods and features from component
class Generation extends Component {
    // equivalent to setting "this.state" within a constructor
    state = { generation: DEFAULT_GENERATION };

    // so these are like hooks i guess
    componentDidMount() {
        this.fetchNextGeneration();
    }
    
    fetchGeneration = () => {
        // special function exposed for javascript, pass in url, returns a promise
        fetch('http://localhost:3000/generation')
            .then(response => {
                response.json()
                    .then(json => { 
                        console.log('json', json); 
                        
                        // whenever you update state, use setState
                        // don't modify directly with this.state = 
                        // react applies special background stuff
                        // when you use setState. not using it can 
                        // lead to weird loops in react that freeze 
                        // the app.
                        this.setState({ generation: json.generation });
                    })
                    .catch(error => { 
                        console.error('error', error) 
                    });
            });
    };

    fetchNextGeneration = () => {
        this.fetchGeneration();

        let delay = new Date(this.state.generation.expiration).getTime() - new Date().getTime();
        if(delay < MINIMUM_DELAY) {
            delay = MINIMUM_DELAY;
        }

        setTimeout(() => this.fetchNextGeneration(), delay);
    }

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