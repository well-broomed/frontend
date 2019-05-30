import { USER_CHECKED } from '../actions';

const initialState = {
	userInfo: null,
	userChecked: null,
	currentUser: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case USER_CHECKED:
			return { ...state, userInfo: action.payload.userInfo, userChecked: true, currentUser: action.payload.user };

		default:
			return state;
	}
};

export default authReducer;
