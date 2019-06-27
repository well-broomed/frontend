import { combineReducers } from 'redux';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer';
import guestReducer from './guestReducer';
import reportsReducer from './reportsReducer';
import partnerReducer from './partnerReducer';

const allReducers = combineReducers({
	authReducer,
	propertyReducer,
	guestReducer,
	reportsReducer,
	partnerReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'RESET_APP') {
		state = undefined;
	}

	return allReducers(state, action);
};

export default rootReducer;
