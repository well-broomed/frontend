import {
	// FETCHING_PROPERTIES,
	PROPERTIES_FETCHED,
	PROPERTY_ADDED,
	CLEANERS_FETCHED,
	PARTNERS_FETCHED,
	CLEANER_UPDATED,
	GETTING_PROPERTY,
	GOT_PROPERTY,
	GET_PROPERTY_ERROR
} from '../actions';

const initialState = {
	properties: null,
	property: {},
	refreshProperties: false,
	cleaners: null,
	refreshCleaners: false,
	partners: null
};

const propertyReducer = (state = initialState, action) => {
	switch (action.type) {
		case GETTING_PROPERTY:
			return { ...state, gettingProperty: true };

		case GOT_PROPERTY:
			return { ...state, property: action.payload, gettingProperty: undefined };

		case GET_PROPERTY_ERROR:
			return {
				...state,
				getPropertyError: action.payload,
				gettingProperty: undefined
			};

		case PROPERTIES_FETCHED:
			return { ...state, properties: action.payload, refreshProperties: false };

		case PROPERTY_ADDED:
			return { ...state, refreshProperties: true };

		case CLEANERS_FETCHED:
			return { ...state, cleaners: action.payload };

		case CLEANER_UPDATED:
			return {...state, refreshCleaners: true}
		
		case PARTNERS_FETCHED:
			return {...state, partners: action.payload};
		
		default:
			return state;
	}
};

export default propertyReducer;
