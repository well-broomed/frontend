import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer';

export default combineReducers({
	exampleReducer,
	authReducer,
	propertyReducer,
});
