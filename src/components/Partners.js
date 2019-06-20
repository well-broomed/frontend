// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
// Axios
import axios from 'axios';
//Material-UI
import {
	TextField, 
	Typography, 
	Fab, 
	Button, 
	Dialog, 
	DialogTitle, 
	DialogContent, 
	DialogActions} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { withStyles } from '@material-ui/core';

import styled from 'styled-components';

//Actions
import { getPartners, getUserProperties, sendInvite } from '../actions';

//Component
import PartnerCard from './PartnerCard';

const styles = {
	card: {
		maxWidth: 600,
		margin: '20px auto'
	},
	invite: {
		maxWidth: 600,
		margin: '20px auto'
	},
	img: {
		width: 40
	},
	content: {
		display: 'flex'
	},
	contentTypography: {
		margin: 'auto'
	}
};


const TopBar = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
`;


class Partners extends React.Component {

	componentDidMount() {
		if(!localStorage.getItem('jwt')){
			this.props.history.replace('/');
		}

		this.props.getPartners();
	}


	componentDidUpdate(prevProps) {
		// follow the action cascade for user > properties > partners
		if(this.props.refreshProperties !== prevProps.refreshProperties){
			this.props.getUserProperties();
		}

		if(this.props.refreshCleaners !== prevProps.refreshCleaners){
			this.props.getPartners();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			partners: this.props.cleaners,
			email: '',
			emailModal: false,
			formSent: false,
		};
	}

	toggleEmail = event => {
		this.setState({
			emailModal: !this.state.emailModal,
		})
		// reset the form once the modal fades
		setTimeout(() => {
			this.setState({
				email: '',
				formSent: false,
			})
		}, 500)
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = event => {
		this.props.sendInvite(this.state.email);

		this.setState({
			formSent: true,
		})

		// toggle the modal after confirmation
		setTimeout(() => {
			this.toggleEmail();
		}, 2000);
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<TopBar>
				<Typography variant="h2">Partners</Typography>
						<Fab
							color="primary"
							className={classes.addIcon}
							onClick={this.toggleEmail}
						>
							<AddIcon />
						</Fab>
				</TopBar>




				{this.props.cleaners ? (
					this.props.cleaners.map(partner => {
						return <PartnerCard partner={partner} key={partner.user_id} />;
					})
				) : (
					<Typography variant="overline">
						No partners have been invited yet.
					</Typography>
				)}
				<div className={classes.invite}>
					
					{/** Email Modal */}
					<Dialog open = {this.state.emailModal} onClose = {this.toggleEmail} maxWidth = 'xl' fullWidth = {true}>
					{!this.state.formSent ? (
								<>
								<DialogTitle>Send An Email Invitation</DialogTitle>
								<DialogContent>
									
									<TextField fullWidth variant = 'outlined' autoFocus value = {this.state.email} onChange = {this.handleInputChange}
									placeholder = "Partner's Email"
									type='text'
									name='email'/>
								</DialogContent>
								<DialogActions>
									<Button onClick = {this.toggleEmail} variant = 'outlined'>Cancel</Button>
									<Button onClick = {this.handleSubmit} variant = 'contained' color = 'primary'>Submit</Button>
								</DialogActions>
								</>
								) : (
								<>
								<DialogTitle>
									Invitation has been sent to {this.state.email}.
								</DialogTitle>
								</>)}
						
					</Dialog>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		properties: state.propertyReducer.properties,
		cleaners: state.propertyReducer.partners,
		refreshCleaners: state.propertyReducer.refreshCleaners,
		refreshProperties: state.propertyReducer.refreshProperties
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			getPartners,
			getUserProperties,
			sendInvite,
		}
	)(withStyles(styles)(Partners))
);
