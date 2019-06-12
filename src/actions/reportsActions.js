import axios from 'axios';

// getReports
export const GETTING_REPORTS = 'GETTING_REPORTS';
export const GOT_REPORTS = 'GOT_REPORTS';
export const GET_REPORTS_ERROR = 'GET_REPORTS_ERROR';

// getPastReports
export const GETTING_PAST_REPORTS = 'GETTING_PAST_REPORTS';
export const GOT_PAST_REPORTS = 'GOT_PAST_REPORTS';
export const GET_PAST_REPORTS_ERROR = 'GET_PAST_REPORTS_ERROR';

const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`;

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

export const getReports = () => {
	let options = setHeaders();

	return dispatch => {
		dispatch({ type: GETTING_REPORTS });

		axios
			.get(`${backendUrl}/api/reports`, options)
			.then(res => {
				dispatch({ type: GOT_REPORTS, payload: res.data.reports });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: GET_REPORTS_ERROR, payload: error });
			});
	};
};

export const getPastReports = () => {
	let options = setHeaders();

	return dispatch => {
		dispatch({ type: GETTING_PAST_REPORTS });

		axios
			.get(`${backendUrl}/api/reports/past`, options)
			.then(res => {
				dispatch({ type: GOT_PAST_REPORTS, payload: res.data.pastReports });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: GET_PAST_REPORTS_ERROR, payload: error });
			});
	};
};
