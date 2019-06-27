import axios from 'axios';

// getGuest
export const GETTING_GUEST = 'GETTING_GUEST';
export const GOT_GUEST = 'GOT_GUEST';
export const GET_GUEST_ERROR = 'GET_GUEST_ERROR';

// updateGuestTask
export const UPDATING_GUEST_TASK = 'UPDATING_GUEST_TASK';
export const UPDATED_GUEST_TASK = 'UPDATED_GUEST_TASK';
export const UPDATE_GUEST_TASK_ERROR = 'UPDATE_GUEST_TASK_ERROR';

export const FETCHING_GUESTS = 'FETCHING_GUESTS';
export const GUESTS_FETCHED = 'GUESTS_FETCHED';
export const ERROR = 'ERROR';

export const ADDING_GUEST = 'ADDING_GUEST';
export const GUEST_ADDED = 'GUEST_ADDED';


export const UPDATING_GUEST = 'UPDATING_GUEST';
export const GUEST_UPDATED = 'GUEST_UPDATED';

export const DELETING_GUEST = 'DELETING_GUEST';
export const GUEST_DELETED = 'GUEST_DELETED';

// reassignCleaner
export const REQUESTING_REASSIGNMENT = 'REQUESTING_REASSIGNMENT';
export const REQUESTED_REASSIGNMENT = 'REQUESTED_REASSIGNMENT';
export const REQUEST_REASSIGNMENT_ERROR = 'REQUEST_REASSIGNMENT_ERROR';

const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`;


function setHeaders(){
	const token = localStorage.getItem('jwt');
	const userInfo = localStorage.getItem('userInfo');
	
	const options = {
		headers: {
			Authorization: `Bearer ${token}`,
			'user-info': userInfo
		}
	};

	return options;
}

export const getGuest = guest_id => {
	let options = setHeaders();

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
	let options = setHeaders();

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

export const fetchAllGuests = () => {
	let options = setHeaders();

	const endpoint = axios.get(`${backendUrl}/api/guests`, options);

	return dispatch => {
		dispatch({type: FETCHING_GUESTS});

		endpoint.then(res => {
			dispatch({type: GUESTS_FETCHED, payload: res.data.guests})
		}).catch(error => {
			console.log(error);
			dispatch({type: ERROR});
		})
	}
}

export const addGuest = (property_id, guest) => {
	let options = setHeaders();

	const endpoint = axios.post(`${backendUrl}/api/guests/${property_id}`, guest, options);

	return dispatch => {
		dispatch({type: ADDING_GUEST});

		endpoint.then(res => {
			console.log(res.data, 'add guest res');
			dispatch({type: GUEST_ADDED, payload: res.data}) // payload is new guest ID
		}).catch(error => {
			console.log(error);
			dispatch({type: ERROR});
		})
	}
}


export const updateGuest = (guest_id, guest) => {
	let options = setHeaders();

	const endpoint = axios.put(`${backendUrl}/api/guests/${guest_id}`, guest, options);

	return dispatch => {
		dispatch({type: UPDATING_GUEST});

		endpoint.then(res => {
			console.log('update guest res', res.data);

			dispatch({type: GUEST_UPDATED, payload: res.data});
		}).catch(error => {
			console.log(error);
			dispatch({type: ERROR})
		})
	}
}

export const deleteGuest = (guest_id) => {
	let options = setHeaders();

	const endpoint = axios.delete(`${backendUrl}/api/guests/${guest_id}`, options);

	return dispatch => {
		dispatch({type: DELETING_GUEST});

		endpoint.then(res => {
			dispatch({type: GUEST_DELETED})
		}).catch(error => {
			console.log(error);
			dispatch({type: ERROR})
		})
	}
}

export const reassignCleaner = (guest_id, cleaner_id) => {
	let options = setHeaders();

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
