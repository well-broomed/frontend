import { combineReducers } from 'redux';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer';
import guestReducer from './guestReducer';
import reportsReducer from './reportsReducer';

export default combineReducers({
	authReducer,
	propertyReducer,
	guestReducer,
	reportsReducer
});
