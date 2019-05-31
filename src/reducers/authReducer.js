import { USER_CHECKED, USER_UPDATED, UPDATING_USER } from '../actions';

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
		
		case UPDATING_USER:
			return {
				...state,
				userChecked: false,
			}

		case USER_UPDATED:
			return  {
				...state,
				userInfo: action.payload.userInfo,
				currentUser: action.payload.user,
				userChecked: true,
			}

		default:
			return state;
	}
};

export default authReducer;
