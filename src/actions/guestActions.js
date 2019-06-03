import axios from 'axios';

// getGuest
export const GETTING_GUEST = 'GETTING_GUEST';
export const GOT_GUEST = 'GOT_GUEST';
export const GET_GUEST_ERROR = 'GET_GUEST_ERROR';

// updateGuestTask
export const UPDATING_GUEST_TASK = 'UPDATING_GUEST_TASK';
export const UPDATED_GUEST_TASK = 'UPDATED_GUEST_TASK';
export const UPDATE_GUEST_TASK_ERROR = 'UPDATE_GUEST_TASK_ERROR';

// reassignCleaner
export const REQUESTING_REASSIGNMENT = 'REQUESTING_REASSIGNMENT';
export const REQUESTED_REASSIGNMENT = 'REQUESTED_REASSIGNMENT';
export const REQUEST_REASSIGNMENT_ERROR = 'REQUEST_REASSIGNMENT_ERROR';

const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`;

export const getGuest = guest_id => {
	const token = localStorage.getItem('jwt');
	const userInfo = localStorage.getItem('userInfo');

	const options = {
		headers: { Authorization: `Bearer ${token}`, 'user-info': userInfo }
	};

	return dispatch => {
		dispatch({ type: GETTING_GUEST });

		axios
			.get(`${backendUrl}/api/guests/${guest_id}`, options)
			.then(res => {
				dispatch({ type: GOT_GUEST, payload: res.data.guest });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: GET_GUEST_ERROR, payload: error });
			});
	};
};

export const updateGuestTask = (guest_id, task_id, completed) => {
	const token = localStorage.getItem('jwt');
	const userInfo = localStorage.getItem('userInfo');

	const options = {
		headers: { Authorization: `Bearer ${token}`, 'user-info': userInfo }
	};

	return dispatch => {
		dispatch({ type: UPDATING_GUEST_TASK });

		axios
			.put(
				`${backendUrl}/api/guests/${guest_id}/tasks/${task_id}`,
				{ completed },
				options
			)
			.then(res => {
				dispatch({ type: UPDATED_GUEST_TASK, payload: res.data.updatedTask });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: UPDATE_GUEST_TASK_ERROR, payload: error });
			});
	};
};

export const reassignCleaner = (guest_id, cleaner_id) => {
	const token = localStorage.getItem('jwt');
	const userInfo = localStorage.getItem('userInfo');

	const options = {
		headers: { Authorization: `Bearer ${token}`, 'user-info': userInfo }
	};

	return dispatch => {
		dispatch({ type: REQUESTING_REASSIGNMENT });

		axios
			.post(
				`${backendUrl}/api/guests/${guest_id}/reassign/${cleaner_id}`,
				{},
				options
			)
			.then(res => {
				dispatch({ type: REQUESTED_REASSIGNMENT, payload: res.data });

				return dispatch(getGuest(guest_id));
			})

			.catch(error => {
				console.log(error);
				dispatch({ type: REQUEST_REASSIGNMENT_ERROR, payload: error });
			});
	};
};
