import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-ui/core';

class Invite extends Component {
	constructor(props) {
		super(props);
		this.state = {
			successful: false
		};
	}

	async componentDidMount() {
		const backendUrl =
			process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`;
		const inviteCode = this.props.match.params.invite_code;
		let token = localStorage.getItem('jwt');
		let userInfo = localStorage.getItem('userInfo');

		let options = {
			headers: {
				Authorization: `Bearer ${token}`,
				'user-info': userInfo
			}
		};
		const response = await axios.get(
			`${backendUrl}/api/invites/accept/${inviteCode}`,
			options
		);
		if (response) this.setState({ successful: true });
	}

	render() {
		const loggedIn = localStorage.getItem('jwt');
		return (
			<div>
				{loggedIn ? (
					<div>
						{this.state.successful ? (
							<Typography variant="h6">
								{' '}
								Congratulations, your invitation has been processed
								successfully! Click <Link to="/account">here </Link> to go to
								your account page for more details{' '}
							</Typography>
						) : (
							<Typography variant="h6">
								{' '}
								Unfortunately, your invitation was not successful. This may be
								because you have already accepted an invitation from this user.{' '} <br></br>
							    {/*<Link to="/account">Click here to go to your account page.</Link> Implement a current partners view in account page*/}
							</Typography>
						)}{' '}
					</div>
				) : (
					<Typography variant="h6">
						To process your invitation, you must be logged in. Please login or
						create an account and then visit the invitation link given from your
						email invitation.
					</Typography>
				)}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		userInfo: state.authReducer.userInfo
	};
}

export default connect(mapStateToProps)(Invite);
