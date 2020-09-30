import React, { Component } from 'react'; 

class DragonAvatar extends Component {
    componentDidMount() {}
    componentWillUnmount() {}
    render() {
        // describe component structure of this component through jsx
        const dragon = this.props.dragon;
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

export default DragonAvatar;