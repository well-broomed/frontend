import axios from 'axios';

export const SENDING_INVITE = 'SENDING_INVITE';
export const INVITE_SENT = 'INVITE_SENT';
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