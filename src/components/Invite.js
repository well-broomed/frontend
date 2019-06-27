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

import styled from 'styled-components';

const TopBar = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	margin-bottom: 20px;
	text-align: center;
	`;

const CardContainer = styled.div`

	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;

	div{
		width: 75%;
		text-align: center;
	}

	div > div{
		width: 100%;
		text-align: center;
	}
	
	.action-box{
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
	}

	`;

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
			<TopBar>
			<Typography variant = 'h2'>
			Welcome to WellBroomed!
			</Typography>
			</TopBar>
			{this.state.inviteInfo ? (
				<div>
					<CardContainer>
					<Card>
						<CardContent>
							<Typography variant = 'h5'>
								You have been invited by <strong>{this.state.inviteInfo.manager_profile.user_name}</strong> ({this.state.inviteInfo.manager_profile.email}) to join WellBroomed.
							</Typography>

							<Typography variant = 'body1'>
								To accept your invitation, please click below and create an account with the email on your invitation ({this.state.inviteInfo.email}).
							</Typography>
						</CardContent>
						
						<CardActions>
							<div className = 'action-box'>
							<Button variant = 'contained' color = 'primary' onClick = {this.handleLogin}>Accept</Button>
							</div>
						</CardActions>
					</Card>
					</CardContainer>
				
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
