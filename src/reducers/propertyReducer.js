import { FETCHING_PROPERTIES, PROPERTIES_FETCHED } from '../actions';

const initialState = {
    properties: null,
};

const propertyReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case PROPERTIES_FETCHED:
			return { ...state, properties: action.payload};

		default:
			return state;
	}
};

export default propertyReducer;
