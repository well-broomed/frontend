import {
    INVITES_FETCHED,
    INVITE_SENT,
    AVAILABILITY_ADDED,
    AVAILABILITY_REMOVED,
    
    AVAILABLE_PROPERTIES_FETCHED,

    ERROR,
} from '../actions';

const initialState = {
    refreshInvites: false,
    refreshAvailable: false,
    invites: null,
    availableProperties: null,
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
        
        case AVAILABILITY_ADDED:
            return {
                ...state,
                refreshAvailable: true,
            }

        case AVAILABILITY_REMOVED:
            return {
                ...state,
                refreshAvailable: true,
            }

        case AVAILABLE_PROPERTIES_FETCHED:
            return {
                ...state,
                availableProperties: action.payload,
                refreshAvailable: false,
            }

        case ERROR:
            return {
                ...state,
            }
		
		default:
			return state;
	}
};

export default partnerReducer;
