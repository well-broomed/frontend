import { FETCHING_PROPERTIES, PROPERTIES_FETCHED, PROPERTY_ADDED } from '../actions';

const initialState = {
	properties: null,
	refreshProperties: false,
};

const propertyReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case PROPERTIES_FETCHED:
			return { ...state, properties: action.payload, refreshProperties: false};

		case PROPERTY_ADDED:
			return {...state, refreshProperties: true}
		default:
			return state;
	}
};

export default propertyReducer;
