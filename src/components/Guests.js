// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';

import {
	fetchAllGuests,
	getUserProperties,
	getCleaners
} from '../actions/index';

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

const styles = {
	card: {
		minWidth: 275
	},
	addIcon: {
		fontSize: '5rem',
		cursor: 'pointer'
	}
};

const TopBar = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
`;

// const TabContainer = styled.div`

//     display: flex;
//     flex-flow: column nowrap;
//     border: 2px solid black;
//     `;

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class Guests extends React.Component {
	componentDidMount() {
		if (!localStorage.getItem('jwt')) {
			this.props.history.replace('/');
		}

		if (!this.props.guests) {
			this.props.fetchAllGuests();
		}

		if (!this.props.properties) {
			this.props.getUserProperties();
		}

		if (!this.props.cleaners) {
			this.props.getCleaners();
		}
	}

	componentDidUpdate(prevProps) {
		console.log('newguests');
		if (prevProps.refreshGuests !== this.props.refreshGuests) {
			this.props.fetchAllGuests();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			addModal: false,
			tab: 0
		};
	}

	handleModalOpen = () => {
		this.setState({
			addModal: true
		});
	};

	handleModalClose = () => {
		this.setState({
			addModal: false
		});
	};

	handleTab = value => event => {
		this.setState({
			tab: value
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<TopBar>
					<Typography variant="h2">Guests</Typography>{' '}
					<Fab
						color="primary"
						className={classes.addIcon}
						onClick={this.handleModalOpen}
					>
						<AddIcon />
					</Fab>
				</TopBar>
				<br />

				<Dialog
					open={this.state.addModal}
					TransitionComponent={Transition}
					onClose={this.handleModalClose}
					fullWidth={false}
					maxWidth={'70%'}
				>
					<DialogContent fullWidth={false} maxWidth={'100%'}>
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
								<Tab label="Incomplete" value={1} onClick={this.handleTab(1)} />
								<Tab label="Complete" value={2} onClick={this.handleTab(2)} />
							</Tabs>
						</AppBar>

						{this.props.guests ? (
							<div>
								{this.props.guests.map(guest => {
									return <GuestPreview guest={guest} tab={this.state.tab} />;
								})}
							</div>
						) : null}
						{/* 
                        {this.state.tab === 0 && <TabContainer>Upcoming</TabContainer>}

                        {this.state.tab === 1 && <TabContainer>Incomplete</TabContainer>}

                        {this.state.tab === 2 && <TabContainer>Complete</TabContainer>} */}
					</div>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		guests: state.guestReducer.guests,
		refreshGuests: state.guestReducer.refreshGuests,
		refreshProperties: state.propertyReducer.refreshProperties,
		refreshCleaners: state.propertyReducer.refreshCleaners
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			fetchAllGuests,
			getUserProperties,
			getCleaners
		}
	)(withStyles(styles)(Guests))
);
