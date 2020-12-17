import { combineReducers } from 'redux'; // key to scalable pattern with redux and reducers
import account from './account';
import dragon from './dragon'; // get generationreducer
import generation from './generation'; // get generationreducer

// take multiple reducers in folder and join them within one overall function

export default combineReducers({
    account, 
    dragon,
    generation
}); // takes in object w every reducer we want to combine. 