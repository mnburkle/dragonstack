import React, { Component } from 'react'; 
import DragonAvatar from './DragonAvatar';

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
        // whenever state updates in this component, the dragonavatar one does too
        return <DragonAvatar dragon={this.state.dragon} />;
    }
}

// share stuff, so instead of exporting we will do
export default Dragon;