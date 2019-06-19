import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-ui/core';

import Auth from './Auth';

const auth = new Auth();

class Invite extends Component {

	componentDidMount(){
		let inviteCode = this.props.history.location.search;
		inviteCode = inviteCode.slice(1, inviteCode.length);
		localStorage.setItem('inviteCode', inviteCode);
	}

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	handleLogin = () => {
		localStorage.setItem('role', 'assistant');
		auth.login();
	}

	render() {
		return (
			<div>
			Welcome to WellBroomed!

			To accept your invitation, please click below to create an account.
			<button onClick = {this.handleLogin}>Sign Up</button>

			If you already have an account, click here to log in.
			<button onClick = {this.handleLogin}>Sign In</button>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		user: state.authReducer.user,
	};
}

export default connect(mapStateToProps)(Invite);
