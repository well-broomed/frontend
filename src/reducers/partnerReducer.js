import {
    INVITES_FETCHED,
    INVITE_SENT,
    ERROR,
} from '../actions';

const initialState = {
    refreshInvites: false,
	invites: null,
};

const partnerReducer = (state = initialState, action) => {
	switch (action.type) {
        case INVITE_SENT:
            return {
                ...state,
                refreshInvites: true,
            }
    
        case INVITES_FETCHED:
            return {
                ...state,
                invites: action.payload,
                refreshInvites: false,
            }
		
		default:
			return state;
	}
};

export default partnerReducer;
