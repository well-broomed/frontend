import {
	GETTING_REPORTS,
	GOT_REPORTS,
	GET_REPORTS_ERROR,
	GETTING_PAST_REPORTS,
	GOT_PAST_REPORTS,
	GET_PAST_REPORTS_ERROR
} from '../actions';

const initialState = { reports: [], pastReports: [] };

const reportReducer = (state = initialState, action) => {
	switch (action.type) {
		// getReports
		case GETTING_REPORTS:
			return { ...state, gettingReports: true };

		case GOT_REPORTS:
			return {
				...state,
				gettingReports: undefined,
				reports: action.payload
			};

		case GET_REPORTS_ERROR:
			return {
				...state,
				gettingReports: undefined,
				getReportsError: action.payload
			};

		// getPastReports
		case GETTING_PAST_REPORTS:
			return { ...state, gettingPastReports: true };

		case GOT_PAST_REPORTS:
			return {
				...state,
				gettingPastReports: undefined,
				pastReports: action.payload
			};

		case GET_PAST_REPORTS_ERROR:
			return {
				...state,
				gettingPastReports: undefined,
				getPastReportsError: action.payload
			};

		default:
			return state;
	}
};

export default reportReducer;
