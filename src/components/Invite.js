import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import {checkInvite} from '../actions/index';

import Button from '@material-ui/core/Button';

import Auth from './Auth';
import { isObject } from 'util';

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
				<Typography variant = 'h2'>
			Welcome to WellBroomed!
			</Typography>
			{this.state.inviteInfo ? (
				<div>
					<Card>
						<CardContent>
							<Typography variant = 'body1'>
								You have been invited by <strong>{this.state.inviteInfo.manager_profile.user_name}</strong> ({this.state.inviteInfo.manager_profile.email}) to join WellBroomed!
							</Typography>

							<Typography variant = 'h5'>
								To accept your invitation, please click below and create an account with the email on your invitation ({this.state.inviteInfo.email}).
							</Typography>
						</CardContent>
						
						<CardActions>
							<Button variant = 'contained' color = 'primary' onClick = {this.handleLogin}>Accept</Button>
						</CardActions>
					</Card>
					
				
				</div>
			): (<div><h4>Loading invitation information...</h4></div>)}

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
