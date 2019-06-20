import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-ui/core';

import {checkInvite} from '../actions/index';

import Auth from './Auth';

const auth = new Auth();

class Invite extends Component {

	componentDidMount(){
		// parse and validate the invitation code
		let inviteCode = this.props.history.location.search;
		inviteCode = inviteCode.slice(1, inviteCode.length);
		
		this.props.checkInvite(inviteCode);
		localStorage.setItem('inviteCode', inviteCode);
	}

	componentDidUpdate(prevProps){
		if(prevProps.inviteInfo !== this.props.inviteInfo){
			this.setState({
				inviteInfo: this.props.inviteInfo
			})
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			inviteInfo: null,
		};
	}

	handleLogin = () => {
		localStorage.setItem('role', 'assistant');
		auth.login();
	}

	render() {
		console.log(this.state.inviteInfo, 'invite info');
		return (
			<div>
			Welcome to WellBroomed!
			{this.state.inviteInfo ? (
				<div>
				You have been invited by {this.state.inviteInfo.manager_profile.user_name} to join WellBroomed!

				Please login or create an account with your {this.state.inviteInfo.email} email address.
				</div>
			): (<div><h4>Loading invitation information...</h4></div>)}

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
		inviteInfo: state.authReducer.inviteInfo,
	};
}

export default connect(
	mapStateToProps,
	{
		//actions
		checkInvite,
	}
)(Invite);
