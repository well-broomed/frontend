import { USER_CHECKED } from '../actions';

const initialState = {
	userInfo: null,
	userChecked: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case USER_CHECKED:
			return { ...state, userInfo: action.payload, userChecked: true };

		default:
			return state;
	}
};

export default authReducer;
