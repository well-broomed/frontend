
import {
	// FETCHING_PROPERTIES,
	PROPERTIES_FETCHED,
	PROPERTY_ADDED,
	CLEANERS_FETCHED,
	PARTNERS_FETCHED,
	CLEANER_UPDATED,
	GETTING_PROPERTY,
	GOT_PROPERTY,
	GET_PROPERTY_ERROR,
	ADDING_TASK,
	ADDED_TASK,
	ADD_TASK_ERROR,
	DELETING_TASK,
	DELETED_TASK,
	DELETE_TASK_ERROR
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
			return { ...state, properties: action.payload, refreshProperties: false, refreshCleaners: true };

		case PROPERTY_ADDED:
			return { ...state, refreshProperties: true };

		case CLEANERS_FETCHED:
			return { ...state, cleaners: action.payload, refreshCleaners: false };

		case CLEANER_UPDATED:
			return { ...state, refreshCleaners: true };

		case PARTNERS_FETCHED:
			return { ...state, partners: action.payload };

		// Tasks
		case ADDING_TASK:
			return { ...state, addingTask: true };

		case ADDED_TASK:
			return {
				...state,
				addingTask: undefined,
				property: {
					...state.property,
					tasks: [...state.property.tasks, action.payload]
				}
			};

		case ADD_TASK_ERROR:
			return { ...state, addingTask: undefined, addTaskError: action.payload };

		case DELETING_TASK:
			return { ...state, deleting_task: true };

		case DELETED_TASK:
			return {
				...state,
				deleting_task: undefined,
				property: {
					...state.property,
					tasks: state.property.tasks.filter(
						({ task_id }) => task_id !== parseInt(action.payload)
					)
				}
			};

		case DELETE_TASK_ERROR:
			return {
				...state,
				deleting_task: undefined,
				deleteTaskError: action.payload
			};

		default:
			return state;
	}
};

export default propertyReducer;
