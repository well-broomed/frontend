import axios from 'axios';

export const ERROR = 'ERROR';
export const FETCHING_PROPERTIES = 'FETCHING_PROPERTIES';
export const PROPERTIES_FETCHED = 'PROPERTIES_FETCHED';
export const ADDING_PROPERTY = 'ADDING_PROPERTY';
export const PROPERTY_ADDED = 'PROPERTY_ADDED';
export const FETCHING_CLEANERS = 'FETCHING_CLEANERS';
export const CLEANERS_FETCHED = 'CLEANERS_FETCHED';  
export const UPDATING_CLEANER = 'UPDATING_CLEANER';
export const CLEANER_UPDATED = 'CLEANER_UPDATED';

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
            dispatch({type: PROPERTIES_FETCHED, payload: res.data.properties});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const addProperty = property => {

    let token = localStorage.getItem('jwt');
    let userInfo = localStorage.getItem('userInfo');

    let options = {
        headers: {
            Authorization: `Bearer ${token}`,
            'user-info': userInfo,
        }
    }

    const endpoint = axios.post(`${backendUrl}/api/properties`, property, options);

    return dispatch => {
        dispatch({type: ADDING_PROPERTY});

        endpoint.then(res => {
            console.log('add return', res.data);

            dispatch({type: PROPERTY_ADDED});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR});
        })
    }
}

export const getCleaners = () => {

    let token = localStorage.getItem('jwt');
    let userInfo = localStorage.getItem('userInfo');

    let options = {
        headers: {
            Authorization: `Bearer ${token}`,
            'user-info': userInfo,
        }
    }

    const endpoint = axios.get(`${backendUrl}/api/cleaners`, options);

    return dispatch => {
        dispatch({type: FETCHING_CLEANERS});

        endpoint.then(res => {
            console.log('get cleaners', res.data);

            dispatch({type: CLEANERS_FETCHED, payload: res.data.cleaner_profiles});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const changeCleaner = (property_id, cleaner_id) => {

    let token = localStorage.getItem('jwt');
    let userInfo = localStorage.getItem('userInfo');

    let options = {
        headers: {
            Authorization: `Bearer ${token}`,
            'user-info': userInfo,
        }
    }

    const endpoint = axios.put(`${backendUrl}/api/cleaners/update/${property_id}`, cleaner_id, options)

    return dispatch => {
        dispatch({type: UPDATING_CLEANER});

        endpoint.then(res => {
            console.log('cleaner update', res.data);

            dispatch({type: CLEANER_UPDATED, paload: res.data.updated});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR});
        })
    }
}