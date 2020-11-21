import { GENERATION } from './types';
import { BACKEND } from '../config';

// rather than exporting single action creator, hold code that wraps
// around generation fetch from generation component 
export const fetchGeneration = () => dispatch => {
    dispatch({ type: GENERATION.FETCH });

    return fetch(`${BACKEND.ADDRESS}/generation`)
        .then(response => response.json())
        .then(json => {
            if (json.type === 'error') {
                dispatch({
                    type: GENERATION.FETCH_ERROR,
                    message: json.message
                });
            } else {
                // dispatch(generationActionCreator(json.generation))
                dispatch({ 
                    type: GENERATION.FETCH_SUCCESS,
                    generation: json.generation 
                });
            }
        })
        .catch(error => {
            // console.error('error', error);
            dispatch({
                type: GENERATION.FETCH_ERROR,
                message: error.message
            });
        });
}