import {
	// FETCHING_PROPERTIES,
	PROPERTIES_FETCHED,
	PROPERTY_ADDED,
	PROPERTY_DELETED,
	FETCHING_PARTNERS,
	PARTNERS_FETCHED,
	CLEANER_UPDATED,
	GETTING_PROPERTY,
	GOT_PROPERTY,
	GET_PROPERTY_ERROR,
	GETTING_PROPERTY_CLEANERS,
	GOT_PROPERTY_CLEANERS,
	GET_PROPERTY_CLEANERS_ERROR,
	GETTING_DEFAULT_PROPERTIES,
	GOT_DEFAULT_PROPERTIES,
	GET_DEFAULT_PROPERTIES_ERROR,
	ADDING_TASK,
	ADDED_TASK,
	ADD_TASK_ERROR,
	DELETING_TASK,
	DELETED_TASK,
	DELETE_TASK_ERROR,
	USER_CHECKED,
	UPDATING_TASK,
	UPDATED_TASK,
	UPDATE_TASK_ERROR,
	UPDATING_DEADLINE,
	UPDATED_DEADLINE,
	UPDATE_DEADLINE_ERROR,
	PROPERTY_UPDATED,
} from '../actions';

const initialState = {
	properties: null,
	property: {},
	refreshProperties: false,
	cleaners: null,
	refreshCleaners: false,
	partners: null,
	tasks: null,
};

const propertyReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_CHECKED:
			return {
				...state,
				refreshProperties: true,
			};

		case GETTING_PROPERTY:
			return { ...state, gettingProperty: true };

		case GOT_PROPERTY:
			return { ...state, property: action.payload, gettingProperty: undefined };

		case GET_PROPERTY_ERROR:
			return {
				...state,
				getPropertyError: action.payload,
				gettingProperty: undefined,
			};

		case PROPERTIES_FETCHED:
			return {
				...state,
				properties: action.payload,
				refreshProperties: false,
				refreshCleaners: true,
			};

		case GETTING_PROPERTY_CLEANERS:
			return { ...state, gettingPropertyCleaners: true };

		case GOT_PROPERTY_CLEANERS:
			return {
				...state,
				cleaners: action.payload.cleaners,
				propertyCleaners: action.payload.propertyCleaners,
				gettingPropertyCleaners: undefined,
			};

		case GET_PROPERTY_CLEANERS_ERROR:
			return {
				...state,
				getPropertyCleanersError: action.payload,
				gettingPropertyCleaners: undefined,
			};

		case GETTING_DEFAULT_PROPERTIES:
			return { ...state, gettingDefaultProperties: true };

		case GOT_DEFAULT_PROPERTIES:
			return {
				...state,
				defaultProperties: action.payload,
				gettingDefaultProperties: undefined,
			};

		case GET_DEFAULT_PROPERTIES_ERROR:
			return {
				...state,
				getDefaultPropertiesError: action.payload,
				gettingDefaultProperties: undefined,
			};

		case PROPERTY_ADDED:
			return { ...state, refreshProperties: true };

		case PROPERTY_DELETED:
			return { ...state, refreshProperties: true };

		case PROPERTY_UPDATED:
			return { ...state, refreshProperties: true };

		case CLEANER_UPDATED:
			return { ...state, refreshCleaners: true, refreshProperties: true };

		case FETCHING_PARTNERS:
			return { ...state, refreshCleaners: false };

		case PARTNERS_FETCHED:
			return { ...state, partners: action.payload, refreshCleaners: false };

		// Tasks
		case ADDING_TASK:
			return { ...state, addingTask: true };

		case ADDED_TASK:
			return {
				...state,
				addingTask: undefined,
				property: {
					...state.property,
					tasks: [...state.property.tasks, action.payload],
				},
			};

		case UPDATING_TASK:
			return { ...state, updatingTask: true };

		case UPDATED_TASK:
			return {
				...state,
				updatingTask: undefined,
				property: {
					...state.property,
					tasks: state.property.tasks.map(task =>
						task.task_id === action.payload.task_id
							? action.payload.updatedTask
							: task
					),
				},
			};

		case UPDATE_TASK_ERROR:
			return {
				...state,
				updatingTask: undefined,
				updateTaskError: action.payload,
			};

		case UPDATING_DEADLINE:
			return { ...state, updatingDeadline: true };

		case UPDATED_DEADLINE:
			return {
				...state,
				updatingDeadline: undefined,
				property: { ...state.property, tasks: action.payload },
			};

		case UPDATE_DEADLINE_ERROR:
			return {
				...state,
				updatingDeadline: undefined,
				updateDeadlineError: action.payload,
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
					),
				},
			};

		case DELETE_TASK_ERROR:
			return {
				...state,
				deleting_task: undefined,
				deleteTaskError: action.payload,
			};

		default:
			return state;
	}
};

export default propertyReducer;
