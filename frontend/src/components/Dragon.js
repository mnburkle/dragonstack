import React, { Component } from 'react'; 

const DEFAULT_DRAGON = { nickname: 'default', dragonId: '', generationId: '', birthdate: '', traits: [] };

class Dragon extends Component {
    state = { dragon: DEFAULT_DRAGON };

    // so these are like hooks i guess
    componentDidMount() {
        this.fetchDragon();
    }

    componentWillUnmount() {
        // should have cleanup
        // cancel network requests, invalidate timers, etc
    }
    
    fetchDragon = () => {
        // special function exposed for javascript, pass in url, returns a promise
        fetch('http://localhost:3000/dragon/new')
            .then(response => {
                response.json()
                    .then(json => { 
                        console.log('json', json); 
                        this.setState({ dragon: json.dragon });
                    })
                    .catch(error => { 
                        console.error('error', error) 
                    });
            });
    };

    // we have to have this
    render() {
        // describe component structure of this component through jsx
        const { dragon } = this.state;
        // ^ destructuring syntax equivalent to const generation = this.state.generation;

        // <h4>{new Date(generation.expiration).toString()}</h4>
        return (
            <div>
                <span>G{dragon.generationId}.</span>
                <span>I{dragon.dragonId}. </span>
                { dragon.traits.map(trait => trait.value).join(', ') }
            </div>
        );
    }
}

// share stuff, so instead of exporting we will do
export default Dragon;