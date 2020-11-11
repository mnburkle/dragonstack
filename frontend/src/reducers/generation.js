import { GENERATION, GENERATION_ACTION_TYPE } from '../actions/types';

const DEFAULT_GENERATION = { generationId: '', expiration: ''};

const generationReducer = (state = DEFAULT_GENERATION, action) => {
    switch(action.type) {
        case GENERATION.FETCH:
            return state;
        case GENERATION.FETCH_ERROR:
            return { ...state, message: action.message };
        case GENERATION.FETCH_SUCCESS:
            return { ...state, ...action.generation };
        default:
            return state;
    }
};

export default generationReducer;