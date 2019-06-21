import { combineReducers } from 'redux';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer';
import guestReducer from './guestReducer';
import reportsReducer from './reportsReducer';
import partnerReducer from './partnerReducer';

export default combineReducers({
	authReducer,
	propertyReducer,
	guestReducer,
	reportsReducer,
	partnerReducer,
});
