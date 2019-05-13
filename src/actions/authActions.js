import axios from 'axios';

export const ERROR = 'ERROR';
export const CHECKING_USER = 'CHECKING_USER';
export const USER_CHECKED = 'USER_CHECKED';

const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`

export const checkIfUserExists = (role) => {
    // This function passes the auth0 jwt to the backend, and validates whether an entry
    // for this user exists in the database.

    // The role selected by the user is passed upon account validation.

    let token = localStorage.getItem('jwt');

    let options = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    let body = {
        role: role,
    }

    const checkUrl = axios.post(`${backendUrl}/api/users/login`, body, options)

    return dispatch => {
        dispatch({type: CHECKING_USER});

        checkUrl.then(res => {
            localStorage.setItem('userInfo', res.data.userInfo);
            // localStorage.setItem('userId', res.data.profile.id);
            dispatch({type: USER_CHECKED, payload: res.data});
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}