// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';

import { fetchAllGuests, getPropertyCleaners } from '../actions/index';

import AddGuestForm from './AddGuestForm';

import GuestPreview from './GuestPreview';

import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

// Icons
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// DateTime handling with moment.js
import moment from 'moment';

const styles = {
	card: {
		minWidth: 275,
	},
	addIcon: {
		fontSize: '5rem',
		cursor: 'pointer',
	},
};

const TopBar = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	padding: 20px 0px;
	margin-bottom: 20px;
`;

// const TabContainer = styled.div`

//     display: flex;
//     flex-flow: column nowrap;
//     border: 2px solid black;
//     `;

const Transition = React.forwardRef((props, ref) => (
	<Slide direction="up" {...props} ref={ref} />
));

class Guests extends React.Component {
	componentDidMount() {
		if (!localStorage.getItem('jwt')) {
			this.props.history.replace('/');
		}

		// Currently called whether you're a manager or an assistant. Harmless, but throws an error for assistants. Can be fixed with hooks or componentDidUpdate
		this.props.fetchAllGuests();

		this.props.getPropertyCleaners();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.refreshGuests !== this.props.refreshGuests) {
			this.props.fetchAllGuests();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			addModal: false,
			tab: 0,
		};
	}

	handleModalOpen = () => {
		if (!this.props.gettingPropertyCleaners) {
			this.setState({
				addModal: true,
			});
		}
	};

	handleModalClose = () => {
		this.setState({
			addModal: false,
		});
	};

	handleTab = value => event => {
		this.setState({
			tab: value,
		});
	};

	render() {
		const { classes } = this.props;
		let currentTime = moment().format();
		let upcomingGuests = [];
		let currentGuests = [];
		let previousGuests = [];

		if (this.props.guests) {
			upcomingGuests = this.props.guests.filter(
				guest => moment(guest.checkin).format() > currentTime
			);
			previousGuests = this.props.guests.filter(
				guest => moment(guest.checkout).format() < currentTime
			);
			currentGuests = this.props.guests.filter(
				guest =>
					moment(guest.checkin).format() < currentTime &&
					moment(guest.checkout).format() > currentTime
			);
		}

		const manager = this.props.user && this.props.user.role === 'manager';

		return (
			<div>
				<TopBar>
					<Typography variant="h2">Guests</Typography>
					{manager && (
						<Fab
							color="primary"
							className={classes.addIcon}
							onClick={this.handleModalOpen}
						>
							<AddIcon />
						</Fab>
					)}
				</TopBar>

				{/** Add Guest Modal */}
				<Dialog
					open={this.state.addModal}
					TransitionComponent={Transition}
					onClose={this.handleModalClose}
					fullWidth={true}
					maxWidth={'xl'}
				>
					<DialogContent>
						<AddGuestForm
							isOpen={this.state.addModal}
							close={this.handleModalClose}
						/>
					</DialogContent>
				</Dialog>

				{this.props.guests ? (
					<div>
						<AppBar position="static">
							<Tabs value={this.state.tab} variant="fullWidth">
								<Tab label="Upcoming" value={0} onClick={this.handleTab(0)} />
								<Tab label="Current" value={1} onClick={this.handleTab(1)} />
								<Tab label="Previous" value={2} onClick={this.handleTab(2)} />
							</Tabs>
						</AppBar>
						<br />

						{/** Upcoming Guests **/}
						{this.state.tab === 0 ? (
							<>
								{upcomingGuests.length > 0 ? (
									upcomingGuests.map(guest => {
										return (
											<GuestPreview
												guest={guest}
												tab={this.state.tab}
												key={guest.guest_id}
												fetching={this.props.gettingPropertyCleaners}
											/>
										);
									})
								) : (
									<Typography variant="overline">
										You have no upcoming guests.
									</Typography>
								)}
							</>
						) : null}

						{/** Current Guests **/}
						{this.state.tab === 1 ? (
							<>
								{currentGuests.length > 0 ? (
									currentGuests.map(guest => {
										return (
											<GuestPreview
												guest={guest}
												tab={this.state.tab}
												key={guest.guest_id}
												fetching={this.props.gettingPropertyCleaners}
											/>
										);
									})
								) : (
									<Typography variant="overline">
										You have no current guests.
									</Typography>
								)}
							</>
						) : null}

						{/** Previous Guests **/}
						{this.state.tab === 2 ? (
							<>
								{previousGuests.length > 0 ? (
									previousGuests.map(guest => {
										return (
											<GuestPreview
												guest={guest}
												tab={this.state.tab}
												key={guest.guest_id}
												fetching={this.props.gettingPropertyCleaners}
											/>
										);
									})
								) : (
									<Typography variant="overline">
										You have no previous guests.
									</Typography>
								)}
							</>
						) : null}
					</div>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		user: state.authReducer.user,

		guests: state.guestReducer.guests,
		cleaners: state.propertyReducer.cleaners,
		propertyCleaners: state.propertyReducer.propertyCleaners,

		refreshGuests: state.guestReducer.refreshGuests,

		gettingPropertyCleaners: state.propertyReducer.gettingPropertyCleaners,
		getPropertyCleanersError: state.propertyReducer.getPropertyCleanersError,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			fetchAllGuests,
			getPropertyCleaners,
		}
	)(withStyles(styles)(Guests))
);
