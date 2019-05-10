import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import authReducer from './authReducer';

export default combineReducers({
	exampleReducer,
	authReducer,
});
