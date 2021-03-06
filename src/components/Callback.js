import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkIfUserExists, inviteLogin } from '../actions/index';

import Auth from './Auth';

const auth = new Auth();
// The callback component will be hit once the auth0 access token is received
// after a successful login.

// Once it mounts, it will affirm the user's details on the server side,
// pulling any necessary profile information into state

class Callback extends React.Component {
	async componentDidMount() {

		// handle invitation logins
		if(localStorage.getItem('inviteCode')){
			await auth.handleAuthentication().then(status => {
				
				// the jwt is in localstorage, so complete the login flow
				let role = localStorage.getItem('role');
				let inviteCode = localStorage.getItem('inviteCode');

				this.props.inviteLogin(role, inviteCode);

				// remove the invite code from localstorage
				localStorage.removeItem('inviteCode');
			})
		} else {
			await auth.handleAuthentication().then(status => {
				console.log('callback role', localStorage.getItem('accountType'));
				this.props.checkIfUserExists(localStorage.getItem('accountType'));
			});
		}
		
	}

	// @TODO callback redirect cant be properly resolved until backend is deployed
	componentDidUpdate() {
		if (this.props.userChecked === true) {
			localStorage.removeItem('accountType');
			this.props.history.replace('/properties');
		}
	}

	render() {
		return <div>Callback Component Loading...</div>;
	}
}

const mapStateToProps = state => {
	console.log('state', state);
	return {
		// state items
		userInfo: state.authReducer.user,
		userChecked: state.authReducer.userChecked,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			checkIfUserExists,
			inviteLogin
		}
	)(Callback)
);
