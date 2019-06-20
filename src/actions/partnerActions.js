import axios from 'axios';

export const SENDING_INVITE = 'SENDING_INVITE';
export const INVITE_SENT = 'INVITE_SENT';

export const FETCHING_INVITES = 'FETCHING_INVITES';
export const INVITES_FETCHED = 'INVITES_FETCHED';

export const ERROR = 'ERROR';

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

export const sendInvite = email => {
    let options = setHeaders();

    let body = {
        cleaner_email: email,
    }

    const endpoint = axios.post(`${backendUrl}/api/invites`, body, options);

    return dispatch => {
        dispatch({type: SENDING_INVITE})

        endpoint.then(res => {
            console.log('send invite res', res.data);

            dispatch({type: INVITE_SENT})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
};

export const getAllInvites = () => {
    let options = setHeaders();

    const endpoint = axios.get(`${backendUrl}/api/invites/all`, options);

    return dispatch => {
        dispatch({type: FETCHING_INVITES});

        endpoint.then(res => {
            console.log('all invites', res.data.invites);
            dispatch({type: INVITES_FETCHED, payload: res.data.invites});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}