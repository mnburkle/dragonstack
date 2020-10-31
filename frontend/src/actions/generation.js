import { GENERATION_ACTION_TYPE } from './types';

// generation data that will be placed within action object
// action creator is not the action itself
// the inner object it returns is action
// this is wrapper around action. 
export const generationActionCreator = (payload) => {
    return {
        type: GENERATION_ACTION_TYPE,
        generation: payload
    };
}