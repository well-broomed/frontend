import { combineReducers } from 'redux';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer';
import guestReducer from './guestReducer';

export default combineReducers({
	authReducer,
	propertyReducer,
	guestReducer
});
