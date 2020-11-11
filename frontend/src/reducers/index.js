import generation from './generation'; // get generationreducer
import { combineReducers } from 'redux'; // key to scalable pattern with redux and reducers
// take multiple reducers in folder and join them within one overall function

export default combineReducers({
    generation 
}); // takes in object w every reducer we want to combine. 