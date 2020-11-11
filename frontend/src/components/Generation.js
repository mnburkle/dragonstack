import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { generationActionCreator } from '../actions/generation';

const DEFAULT_GENERATION = { generationId: '', expiration: '' };
const MINIMUM_DELAY = 3000;

// inherits a bunch of methods and features from component
class Generation extends Component {
    timer = null; // instead of undefined. null used to represent object not set.

    // so these are like hooks i guess
    componentDidMount() {
        this.fetchNextGeneration();
    }

    componentWillUnmount() {
        // should have cleanup
        // cancel network requests, invalidate timers, etc
        clearTimeout(this.timer);
    }

    fetchNextGeneration = () => {
        this.props.fetchGeneration();

        let delay = new Date(this.props.generation.expiration).getTime() - new Date().getTime();
        if(delay < MINIMUM_DELAY) {
            delay = MINIMUM_DELAY;
        }

        this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
    }

    // we have to have this
    render() {
        console.log('this.props', this.props);

        // describe component structure of this component through jsx
        const { generation } = this.props;
        // ^ destructuring syntax equivalent to const generation = this.state.generation;

        return (
            <div>
                <h3>Generation {generation.generationId}. Expires on:</h3>
                <h4>{new Date(generation.expiration).toString()}</h4>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const generation = state.generation;

    return { generation }; // gets attached to props of generation component
};

const componentConnector = connect(
    mapStateToProps, 
    { fetchGeneration }
);

// share stuff, so instead of exporting we will do
export default componentConnector(Generation);