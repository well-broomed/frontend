import axios from 'axios';

export const ERROR = 'ERROR';
export const FETCHING_PROPERTIES = 'FETCHING_PROPERTIES';
export const PROPERTIES_FETCHED = 'PROPERTIES_FETCHED';

const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`

export const getUserProperties = () => {
    // This function passes the auth0 jwt to the backend, and validates whether an entry
    // for this user exists in the database.

    // The role selected by the user is passed upon account validation.

    let token = localStorage.getItem('jwt');
    let userInfo = localStorage.getItem('userInfo');

    let options = {
        headers: {
            Authorization: `Bearer ${token}`,
            'user-info': userInfo,
        }
    }

    const fetchUrl = axios.get(`${backendUrl}/api/properties`, options);

    return dispatch => {
        dispatch({type: FETCHING_PROPERTIES});

        fetchUrl.then(res => {
            console.log('property return', res.data);
            // localStorage.setItem('userId', res.data.profile.id);
            dispatch({type: PROPERTIES_FETCHED, payload: res.data});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}