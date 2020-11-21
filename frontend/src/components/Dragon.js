import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { fetchDragon } from '../actions/dragon';
import fetchStates from '../reducers/fetchStates';

const DEFAULT_DRAGON = { nickname: 'default', dragonId: '', generationId: '', birthdate: '', traits: [] };

class Dragon extends Component {
    state = { dragon: DEFAULT_DRAGON };

    // so these are like hooks i guess
    componentDidMount() {
        this.props.fetchDragon();
    }

    componentWillUnmount() {
        // should have cleanup
        // cancel network requests, invalidate timers, etc
    }
    
    // fetchDragon = () => {
    //     // special function exposed for javascript, pass in url, returns a promise
    //     fetch('http://localhost:3000/dragon/new')
    //         .then(response => {
    //             response.json()
    //                 .then(json => { 
    //                     this.setState({ dragon: json.dragon });
    //                 })
    //                 .catch(error => { 
    //                     console.error('error', error) 
    //                 });
    //         });
    // };

    // we have to have this
    render() {
        const { dragon } = this.props;
        // ^ destructuring syntax equivalent to const generation = this.state.generation;

        if (dragon.status === fetchStates.error) {
            return <div>{dragon.message}</div>
        }

        return (
            <div>   
                <Button onClick={this.props.fetchDragon}>New Dragon</Button>
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const dragon = state.dragon;

    return { dragon }; // gets attached to props of generation component
};

const componentConnector = connect(
    mapStateToProps, 
    { fetchDragon }
);

// share stuff, so instead of exporting we will do
export default componentConnector(Dragon); // can also do connect()(Dragon)