import axios from 'axios';

export const ERROR = 'ERROR';
export const CHECKING_USER = 'CHECKING_USER';
export const USER_CHECKED = 'USER_CHECKED';

const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:9000`

export const checkIfUserExists = () => {
    // This function passes the auth0 jwt to the backend, and validates whether an entry
    // for this user exists in the database.

    // If an entry is found, the userId and Slug are passed back
    // If no entry is found, a new user entry is created automatically.

    let token = localStorage.getItem('jwt');

    let options = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const checkUrl = axios.get(`${backendUrl}/api/users/check-user`, options)

    return dispatch => {
        dispatch({type: CHECKING_USER});

        checkUrl.then(res => {
            localStorage.setItem('userId', res.data.profile.id);
            dispatch({type: USER_CHECKED, payload: res.data.profile});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}