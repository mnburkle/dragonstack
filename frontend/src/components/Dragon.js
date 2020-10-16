import React, { Component } from 'react'; 
import {Button} from 'react-bootstrap';
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
                        this.setState({ dragon: json.dragon });
                    })
                    .catch(error => { 
                        console.error('error', error) 
                    });
            });
    };

    // we have to have this
    render() {
        // we have to pass a callback function because
        // fetchdragon gets evaluated as render is called
        // refetching and updating the state but then itll called 
        // render again lmao
        // <Button onClick={() => this.fetchDragon()}>New Dragon</Button>
        // that said its not good to have () in an attribute of the render.
        // so we fix with just this.fetchDragon (a reference to the function)
        return (
            <div>   
                
                <Button onClick={this.fetchDragon}>New Dragon</Button>
                <DragonAvatar dragon={this.state.dragon} />
            </div>
        );
    }
}

// share stuff, so instead of exporting we will do
export default Dragon;