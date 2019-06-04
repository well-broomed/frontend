import axios from 'axios';

export const ERROR = 'ERROR';
export const FETCHING_PROPERTIES = 'FETCHING_PROPERTIES';
export const PROPERTIES_FETCHED = 'PROPERTIES_FETCHED';

// getProperty
export const GETTING_PROPERTY = 'GETTING_PROPERTY';
export const GOT_PROPERTY = 'GOT_PROPERTY';
export const GET_PROPERTY_ERROR = 'GET_PROPERTY_ERROR';

export const ADDING_PROPERTY = 'ADDING_PROPERTY';
export const PROPERTY_ADDED = 'PROPERTY_ADDED';
export const FETCHING_CLEANERS = 'FETCHING_CLEANERS';
export const CLEANERS_FETCHED = 'CLEANERS_FETCHED';
export const UPDATING_CLEANER = 'UPDATING_CLEANER';
export const CLEANER_UPDATED = 'CLEANER_UPDATED';
export const PARTNERS_FETCHED = 'PARTNERS_FETCHED';
export const FETCHING_PARTNERS = 'FETCHING_PARTNERS';

// addTask
export const ADDING_TASK = 'ADDING_TASK';
export const ADDED_TASK = 'ADDED_TASK';
export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';

// updateTask
export const UPDATING_TASK = 'UPDATING_TASK';
export const UPDATED_TASK = 'UPDATED_TASK';
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';

// updateDeadline
export const UPDATING_DEADLINE = 'UPDATING_DEADLINE';
export const UPDATED_DEADLINE = 'UPDATED_DEADLINE';
export const UPDATE_DEADLINE_ERROR = 'UPDATE_DEADLINE_ERROR';

// removeTask
export const DELETING_TASK = 'DELETING_TASK';
export const DELETED_TASK = 'DELETED_TASK';
export const DELETE_TASK_ERROR = 'DELETE_TASK_ERROR';

function setHeaders() {
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

const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`;

export const getUserProperties = () => {
	// This function passes the auth0 jwt to the backend, and validates whether an entry
	// for this user exists in the database.

	// The role selected by the user is passed upon account validation.

	let options = setHeaders();

	const fetchUrl = axios.get(`${backendUrl}/api/properties`, options);

	return dispatch => {
		dispatch({ type: FETCHING_PROPERTIES });

		fetchUrl
			.then(res => {
				console.log('property return', res.data);
				// localStorage.setItem('userId', res.data.profile.id);
				dispatch({ type: PROPERTIES_FETCHED, payload: res.data.properties });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const getProperty = property_id => {
	let options = setHeaders();

	return dispatch => {
		dispatch({ type: GETTING_PROPERTY });

		axios
			.get(`${backendUrl}/api/properties/${property_id}`, options)
			.then(res => {
				dispatch({ type: GOT_PROPERTY, payload: res.data.property });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: GET_PROPERTY_ERROR, payload: error });
			});
	};
};

export const addProperty = property => {
	let options = setHeaders();

	const endpoint = axios.post(
		`${backendUrl}/api/properties`,
		property,
		options
	);

	return dispatch => {
		dispatch({ type: ADDING_PROPERTY });

		endpoint
			.then(res => {
				console.log('add return', res.data);

				dispatch({ type: PROPERTY_ADDED });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const getCleaners = () => {
	let options = setHeaders();

	const endpoint = axios.get(`${backendUrl}/api/cleaners`, options);

	return dispatch => {
		dispatch({ type: FETCHING_CLEANERS });

		endpoint
			.then(res => {
				dispatch({
					type: CLEANERS_FETCHED,
					payload: res.data.cleaner_profiles
				});
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const getPartners = () => {
	let options = setHeaders();

	const endpoint = axios.get(`${backendUrl}/api/cleaners/partners`, options);

	return dispatch => {
		dispatch({ type: FETCHING_PARTNERS });

		endpoint
			.then(res => {
				dispatch({ type: PARTNERS_FETCHED, payload: res.data.partners });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const changeAvailableCleaner = (property_id, cleaner_id, available) => {
	let options = setHeaders();

	const endpoint = axios.put(
		`${backendUrl}/api/properties/${property_id}/available/${cleaner_id}`,
		{ available },
		options
	);

	return dispatch => {
		dispatch({ type: UPDATING_CLEANER });

		endpoint
			.then(res => {
				dispatch({ type: CLEANER_UPDATED, paload: res.data.updated });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const changeCleaner = (property_id, cleaner_id) => {
	let options = setHeaders();

	const endpoint = axios.put(
		`${backendUrl}/api/cleaners/update/${property_id}`,
		{ cleaner_id },
		options
	);

	return dispatch => {
		dispatch({ type: UPDATING_CLEANER });

		endpoint
			.then(res => {
				dispatch({ type: CLEANER_UPDATED, payload: res.data.updated });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

// Tasks
export const addTask = (property_id, text, deadline) => {
	let options = setHeaders();

	return dispatch => {
		dispatch({ type: ADDING_TASK });

		axios
			.post(
				`${backendUrl}/api/tasks/${property_id}`,
				{ text, deadline },
				options
			)
			.then(res => {
				dispatch({ type: ADDED_TASK, payload: res.data.task });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: ADD_TASK_ERROR, payload: error });
			});
	};
};

export const updateTask = (task_id, text, deadline) => {
	let options = setHeaders();

	return dispatch => {
		dispatch({ type: UPDATING_TASK });

		axios
			.put(`${backendUrl}/api/tasks/${task_id}`, { text, deadline }, options)
			.then(res => {
				dispatch({ type: UPDATED_TASK, payload: res.data.updatedTasks });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: UPDATE_TASK_ERROR, payload: error });
			});
	};
};

export const updateDeadline = (property_id, oldDeadline, newDeadline) => {
	let options = setHeaders();

	return dispatch => {
		dispatch({ type: UPDATING_DEADLINE });

		axios
			.put(
				`${backendUrl}/api/tasks/deadline/${property_id}`,
				{ oldDeadline, newDeadline },
				options
			)
			.then(res => {
				dispatch({ type: UPDATED_DEADLINE, payload: res.data.updatedTasks });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: UPDATE_DEADLINE_ERROR, payload: error });
			});
	};
};

export const deleteTask = task_id => {
	let options = setHeaders();

	return dispatch => {
		dispatch({ type: DELETING_TASK });

		axios
			.delete(`${backendUrl}/api/tasks/${task_id}`, options)
			.then(res => {
				dispatch({ type: DELETED_TASK, payload: res.data.task_id });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: DELETE_TASK_ERROR, payload: error });
			});
	};
};
