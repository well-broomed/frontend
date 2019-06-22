// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
// Axios
import axios from 'axios';

import moment from 'moment';
//Material-UI
import {
	TextField,
	Typography,
	Fab,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { withStyles } from '@material-ui/core';

import styled from 'styled-components';

//Actions
import {
	getPartners,
	getUserProperties,
	sendInvite,
	getAllInvites,
	getDefaultProperties,
} from '../actions';

//Component
import PartnerCard from './PartnerCard';

const styles = {
	root: {
		width: '100%',
	},
	card: {
		maxWidth: 600,
		margin: '20px auto 20px 0',
	},
	invite: {
		maxWidth: 600,
		margin: '20px auto 20px 0',
	},
	img: {
		width: 40,
	},
	content: {
		display: 'flex',
	},
	contentTypography: {
		margin: 'auto',
	},
	table: {
		minWidth: 650,
	},
	paper: {
		width: '100%',
	},
	invitationsTitle: {
		margin: '8px 0 12px',
	},
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
		if (!localStorage.getItem('jwt')) {
			this.props.history.replace('/');
		}

		this.props.getPartners();
		this.props.getAllInvites();
		this.props.getDefaultProperties();
	}

	componentDidUpdate(prevProps) {
		// follow the action cascade for user > properties > partners
		if (this.props.refreshProperties !== prevProps.refreshProperties) {
			this.props.getUserProperties();
		}

		if (this.props.refreshProperties !== prevProps.refreshProperties) {
			this.props.getDefaultProperties();
		}

		if (this.props.refreshCleaners !== prevProps.refreshCleaners) {
			this.props.getPartners();
		}

		if (this.props.refreshInvites !== prevProps.refreshInvites) {
			this.props.getAllInvites();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			partners: this.props.partners,
			email: '',
			emailModal: false,
			formSent: false,
		};
	}

	toggleEmail = event => {
		this.setState({
			emailModal: !this.state.emailModal,
		});
		// reset the form once the modal fades
		setTimeout(() => {
			this.setState({
				email: '',
				formSent: false,
			});
		}, 500);
	};

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = event => {
		this.props.sendInvite(this.state.email);

		this.setState({
			formSent: true,
		});

		// toggle the modal after confirmation
		setTimeout(() => {
			this.toggleEmail();
		}, 2000);
	};

	parseStatus = status => {
		if (status === 0) {
			return 'Pending';
		} else if (status === 1) {
			return 'Accepted';
		} else if (status === 2) {
			return 'Rejected';
		}
	};

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

				{this.props.partners ? (
					this.props.partners.map(partner => {
						return <PartnerCard partner={partner} key={partner.user_id} />;
					})
				) : (
					<Typography variant="overline">
						No partners have been added yet.
					</Typography>
				)}

				{/** Email Modal */}
				<Dialog
					open={this.state.emailModal}
					onClose={this.toggleEmail}
					maxWidth="xl"
					fullWidth={true}
				>
					{!this.state.formSent ? (
						<>
							<DialogTitle>Send An Email Invitation</DialogTitle>
							<DialogContent>
								<TextField
									fullWidth
									variant="outlined"
									autoFocus
									value={this.state.email}
									onChange={this.handleInputChange}
									placeholder="Partner's Email"
									type="text"
									name="email"
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={this.toggleEmail} variant="outlined">
									Cancel
								</Button>
								<Button
									onClick={this.handleSubmit}
									variant="contained"
									color="primary"
								>
									Submit
								</Button>
							</DialogActions>
						</>
					) : (
						<>
							<DialogTitle>
								Invitation has been sent to {this.state.email}.
							</DialogTitle>
						</>
					)}
				</Dialog>

				{/** Invitations Table **/}
				<Typography variant="h2" className={classes.invitationsTitle}>
					Invitations
				</Typography>
				{this.props.invites ? (
					<Paper className={classes.paper}>
						<Table size="small" className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Partner Email</TableCell>
									<TableCell align="right">Invite Code</TableCell>
									<TableCell align="right">Created At</TableCell>
									<TableCell align="right">Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.props.invites.map(invite => (
									<TableRow key={invite.createdAt}>
										<TableCell component="th" scope="row">
											{invite.email}
										</TableCell>
										<TableCell align="right">{invite.inviteCode}</TableCell>
										<TableCell align="right">
											{moment(invite.createdAt).format('LLL')}
										</TableCell>
										<TableCell align="right">
											{this.parseStatus(invite.status)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				) : (
					<>
						<Typography variant="overline">
							No Invitations Have Been Sent
						</Typography>
					</>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		user: state.authReducer.user || {},

		partners: state.propertyReducer.partners,
		defaultProperties: state.propertyReducer.defaultProperties,

		refreshCleaners: state.propertyReducer.refreshCleaners,
		refreshProperties: state.propertyReducer.refreshProperties,
		invites: state.partnerReducer.invites,
		refreshInvites: state.partnerReducer.refreshInvites,
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
			getAllInvites,
			getDefaultProperties,
		}
	)(withStyles(styles)(Partners))
);
