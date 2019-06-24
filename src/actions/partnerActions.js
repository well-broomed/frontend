import axios from 'axios';

export const SENDING_INVITE = 'SENDING_INVITE';
export const INVITE_SENT = 'INVITE_SENT';

export const FETCHING_INVITES = 'FETCHING_INVITES';
export const INVITES_FETCHED = 'INVITES_FETCHED';

export const ADDING_AVAILABILITY = 'ADDING_AVAILABILITY';
export const AVAILABILITY_ADDED = 'AVAILABILITY_ADDED';

export const REMOVING_AVAILABILITY = 'REMOVING_AVAILABILITY';
export const AVAILABILITY_REMOVED = 'AVAILABILITY_REMOVED';

export const FETCHING_AVAILABLE_PROPERTIES = 'FETCHING_AVAILABLE_PROPERTIES';
export const AVAILABLE_PROPERTIES_FETCHED = 'AVAILABLE_PROPERTIES_FETCHED';

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
            if(res.data.invites.length === 0){
                dispatch({type: INVITES_FETCHED, payload: null});
            } else {
                dispatch({type: INVITES_FETCHED, payload: res.data.invites});
            }
            
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const addAvailability = (cleaner_id, property_id) => {
    let options = setHeaders();

    let body = {
        cleaner_id: cleaner_id,
        property_id: property_id,
    }

    const endpoint = axios.post(`${backendUrl}/api/avail/available_properties`, body, options);

    return dispatch => {
        dispatch({type: ADDING_AVAILABILITY});
        
        endpoint.then(res => {
            console.log('add avail res', res.data);

            dispatch({type: AVAILABILITY_ADDED});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const deleteAvailability = (cleaner_id, property_id) => {
    let options = setHeaders();

    const endpoint = axios.delete(`${backendUrl}/api/avail/available_properties/${property_id}`, options);

    return dispatch => {
        dispatch({type: REMOVING_AVAILABILITY});
        
        endpoint.then(res => {
            console.log('remove avail res', res.data);

            dispatch({type: AVAILABILITY_REMOVED});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const getAvailableProperties = () => {
    let options = setHeaders();

    const endpoint = axios.get(`${backendUrl}/api/avail/available_properties`, options);

    return dispatch => {
        dispatch({type: FETCHING_AVAILABLE_PROPERTIES});

        endpoint.then(res => {
            console.log('avail props', res.data);

            dispatch({type: AVAILABLE_PROPERTIES_FETCHED, payload: res.data.available_properties})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}