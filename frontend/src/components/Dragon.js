import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { fetchDragon } from '../actions/dragon';
import fetchStates from '../reducers/fetchStates';

class Dragon extends Component {

    componentDidMount() {
        // this.props.fetchDragon();
    }

    componentWillUnmount() {
        // should have cleanup
        // cancel network requests, invalidate timers, etc
    }

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

// const mapStateToProps = state => {
//     const dragon = state.dragon;

//     return { dragon }; // gets attached to props of generation component
// };

// const componentConnector = connect(
//     mapStateToProps, 
//     { fetchDragon }
// );

// // share stuff, so instead of exporting we will do
// export default componentConnector(Dragon); 

export default connect(
    // ({ dragon }) => { return {dragon}; },
    ({ dragon }) => ({ dragon }), // <-- fun little syntax equivalent to above
    { fetchDragon }
)(Dragon);