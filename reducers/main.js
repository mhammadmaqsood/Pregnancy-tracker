import {combineReducers} from 'redux';
import BlogReducer from './reducers';

const rootReducer = combineReducers({
    blogsList : BlogReducer
})
export default rootReducer;

