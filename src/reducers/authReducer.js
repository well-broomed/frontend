import { CHECKING_USER, USER_CHECKED } from '../actions';

const initialState = {
    userInfo: null,
	userChecked: null,
	currentUser: null,
	inviteStatus: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case USER_CHECKED:
			return { ...state, userInfo: action.payload.userInfo, userChecked: true, currentUser: action.payload.user, inviteStatus: action.payload.inviteStatus };

		default:
			return state;
	}
};

export default authReducer;
