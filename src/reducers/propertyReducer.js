import {
	// FETCHING_PROPERTIES,
	PROPERTIES_FETCHED,
	PROPERTY_ADDED,
	CLEANERS_FETCHED,
	FETCHING_PARTNERS,
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
	DELETE_TASK_ERROR,
	USER_CHECKED,
	UPDATING_TASK,
	UPDATED_TASK,
	UPDATE_TASK_ERROR,
	UPDATING_DEADLINE,
	UPDATED_DEADLINE,
	UPDATE_DEADLINE_ERROR
} from '../actions';

const initialState = {
	properties: null,
	property: {},
	refreshProperties: false,
	cleaners: null,
	refreshCleaners: false,
	partners: null,
	tasks: null
};

const propertyReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_CHECKED:
			return {
				...state,
				refreshProperties: true
			};

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
			return {
				...state,
				properties: action.payload,
				refreshProperties: false,
				refreshCleaners: true
			};

		case PROPERTY_ADDED:
			return { ...state, refreshProperties: true };

		case CLEANERS_FETCHED:
			return { ...state, cleaners: action.payload, refreshCleaners: false };

		case CLEANER_UPDATED:
			return { ...state, refreshCleaners: true, refreshProperties: true };

		case FETCHING_PARTNERS:
			return { ...state, refreshCleaners: false };

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
					)
				}
			};

		case UPDATE_TASK_ERROR:
			return {
				...state,
				updatingTask: undefined,
				updateTaskError: action.payload
			};

		case UPDATING_DEADLINE:
			return { ...state, updatingDeadline: true };

		case UPDATED_DEADLINE:
			return {
				...state,
				updatingDeadline: undefined,
				property: { ...state.property, tasks: action.payload }
			};

		case UPDATE_DEADLINE_ERROR:
			return {
				...state,
				updatingDeadline: undefined,
				updateDeadlineError: action.payload
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
