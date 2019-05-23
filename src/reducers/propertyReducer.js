import { FETCHING_PROPERTIES, PROPERTIES_FETCHED, PROPERTY_ADDED, CLEANERS_FETCHED, CLEANER_UPDATED, PARTNERS_FETCHED, FETCHING_PARTNERS } from '../actions';

const initialState = {
	properties: null,
	refreshProperties: false,
	cleaners: null,
	refreshCleaners: false,
	partners: null
};

const propertyReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case PROPERTIES_FETCHED:
			return { ...state, properties: action.payload, refreshProperties: false};

		case PROPERTY_ADDED:
			return {...state, refreshProperties: true}

		case CLEANERS_FETCHED:
			return {...state, cleaners: action.payload};

		case CLEANER_UPDATED:
			return {...state, refreshCleaners: true}
		
		case PARTNERS_FETCHED:
			return {...state, partners: action.payload};
		
		default:
			return state;
	}
};

export default propertyReducer;
