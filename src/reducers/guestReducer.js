import {
	GETTING_GUEST,
	GOT_GUEST,
	GET_GUEST_ERROR,
	UPDATING_GUEST_TASK,
	UPDATED_GUEST_TASK,
	UPDATE_GUEST_TASK_ERROR,
	GUESTS_FETCHED,
	GUEST_ADDED,
	REQUESTING_REASSIGNMENT,
	REQUESTED_REASSIGNMENT,
	REQUEST_REASSIGNMENT_ERROR
} from '../actions';

const initialState = {
	guest: {},
	refreshGuests: false,
};

const guestReducer = (state = initialState, action) => {
	switch (action.type) {
		// getGuest
		case GETTING_GUEST:
			return { ...state, gettingGuest: true };

		case GOT_GUEST:
			return { ...state, gettingGuest: undefined, guest: action.payload };

		case GET_GUEST_ERROR:
			return {
				...state,
				gettingGuest: undefined,
				getGuestError: action.payload
			};

		case GUESTS_FETCHED:
			return {
				...state,
				guests: action.payload,
				refreshGuests: false,
			}

		case GUEST_ADDED:
			return {
				...state,
				refreshGuests: true,
			}
		

		// updateGuestTask
		case UPDATING_GUEST_TASK:
			return { ...state, updatingGuestTask: true };

		case UPDATED_GUEST_TASK:
			return {
				...state,
				updatingGuestTask: undefined,
				guest: {
					...state.guest,
					tasks: state.guest.tasks.map(task =>
						task.task_id === action.payload.task_id
							? { ...task, completed: action.payload.completed }
							: task
					)
				}
			};

		case UPDATE_GUEST_TASK_ERROR:
			return {
				...state,
				updatingGuestTask: undefined,
				updateGuestTaskError: action.payload
			};

		case REQUESTING_REASSIGNMENT:
			return {
				...state,
				requestingReassignment: true
			};

		case REQUESTED_REASSIGNMENT:
			return {
				...state,
				requestingReassignment: undefined
			};

		case REQUEST_REASSIGNMENT_ERROR:
			return {
				...state,
				requestingReassignment: undefined,
				requestReassignmentError: action.payload
			};

		default:
			return state;
	}
};

export default guestReducer;
