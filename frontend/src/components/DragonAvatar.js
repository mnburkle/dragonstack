import React, { Component } from 'react'; 
import { skinny, slender, sporty, stocky, patchy, plain, spotted, striped } from '../assets';

const propertyMap = { // map - object not an array! specify style or image value based on dragon trait
    backgroundColor: { 
        black: '#263238', 
        white: '#cfd8dc', 
        green: '#a5d6a7', 
        blue:  '#0277bd' 
    },
    build: { 
        slender, 
        stocky, 
        sporty, 
        skinny 
    },
    pattern: { 
        plain: "", // overwriting plain because it makes every dragon opaque grey 
        striped, 
        spotted, 
        patchy 
    },
    size: { 
        tiny: 100, 
        medium: 140, 
        large: 180, 
        enormous: 220 
    },
};

class DragonAvatar extends Component {
    get DragonImage() { 
        // use overlaying technique for traits
        
        const dragonPropertyMap = {};

        this.props.dragon.traits.forEach (trait => {
            dragonPropertyMap[trait.type] = propertyMap[trait.type][trait.value];
        });

        const { backgroundColor, build, pattern, size } = dragonPropertyMap;
        console.log("background color, ", backgroundColor);
        console.log("size, ", size);
        const sizing = { width: size, height: size };

        return (
            <div className='dragon-avatar-image-wrapper'>
                <div className='dragon-avatar-image-background' style={{ backgroundColor: backgroundColor, height: sizing.height, width: sizing.width }}></div>
                <img className='dragon-avatar-image-pattern' src={pattern} style={{ height: sizing.height, width: sizing.width }} />
                <img className='dragon-avatar-image' src={build} style={{ height: sizing.height, width: sizing.width }}/> 
            </div>
        );
    }

    componentDidMount() {}
    componentWillUnmount() {}
    render() {
        // describe component structure of this component through jsx
        const dragon = this.props.dragon;
        // ^ destructuring syntax equivalent to const generation = this.state.generation;

        if (!dragon.dragonId) return <div></div>;

        // <h4>{new Date(generation.expiration).toString()}</h4>
        return (
            <div>
                <span>G{dragon.generationId}.</span>
                <span>I{dragon.dragonId}. </span>
                { dragon.traits.map(trait => trait.value).join(', ') }
                { this.DragonImage }
            </div>
        );
    }
}

export default DragonAvatar;