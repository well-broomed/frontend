import {
    INVITES_FETCHED,
    
    ERROR,
} from '../actions';

const initialState = {
	invites: null,
};

const partnerReducer = (state = initialState, action) => {
	switch (action.type) {
        // example action
        case INVITES_FETCHED:
            return {
                ...state,
                invites: action.payload,
            }
		
		default:
			return state;
	}
};

export default partnerReducer;
