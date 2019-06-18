// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter, Link } from 'react-router-dom';

import { deleteGuest } from '../actions/index';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import moment from 'moment';

import styled from 'styled-components';

import DeleteForeverTwoTone from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoTone from '@material-ui/icons/EditTwoTone';

import EditGuestForm from './EditGuestForm';

const CardContainer = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;

	a {
		color: black;
		text-decoration: none;
		width: 80%;
	}
`;

const CardText = styled.div``;

const CardActions = styled.div`
	width: 20%;
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-start;
	justify-content: flex-end;

	svg {
		cursor: pointer;
		font-size: 3rem;
	}
`;

class GuestPreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			editModal: false,
		};
	}
	handleDelete = () => {
		this.props.deleteGuest(this.props.guest.guest_id);

		this.setState({
			modalOpen: !this.state.modalOpen,
		});
	};

	toggleModal = () => {
		this.setState({
			modalOpen: !this.state.modalOpen,
		});
	};

	toggleEdit = () => {
		this.setState({
			editModal: !this.state.editModal,
		});
	};

	render() {
		// tab 0 = upcoming, 1 = incomplete, 2 = complete
		// console.log(this.props.guest);
		return (
			<div>
				<Card>
					<CardContent>
						<CardContainer>
							<Link to={`/guests/${this.props.guest.guest_id}`}>
								<CardText>
									<Typography variant="h4">
										{this.props.guest.guest_name}
									</Typography>

									<Typography variant="h6">
										{this.props.guest.property_name}
									</Typography>

									<Typography variant="overline">Check-In</Typography>
									<Typography variant="h6">
										{moment(this.props.guest.checkin).format('LLL')}
									</Typography>
									<Typography variant="overline">Check-Out</Typography>
									<Typography variant="h6">
										{moment(this.props.guest.checkout).format('LLL')}
									</Typography>
								</CardText>
							</Link>

							<CardActions>
								<EditTwoTone
									onClick={this.toggleEdit}
									disabled={this.props.fetching}
								/>
								<DeleteForeverTwoTone onClick={this.toggleModal} />
							</CardActions>
						</CardContainer>
					</CardContent>
				</Card>
				<br />

				<Dialog open={this.state.modalOpen} onClose={this.toggleModal}>
					<DialogContent>
						<Typography variant="h6">
							Are you sure you want to delete this?
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={this.toggleModal}
							variant="outlined"
							color="primary"
						>
							Cancel
						</Button>
						<Button
							onClick={this.handleDelete}
							variant="contained"
							color="secondary"
							autoFocus
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={this.state.editModal}
					onClose={this.toggleEdit}
					fullWidth={true}
					maxWidth="xl"
				>
					<DialogContent>
						<EditGuestForm close={this.toggleEdit} guest={this.props.guest} />
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		// tasks: state.propertyReducer.tasks,
		// guests: state.guestReducer.guests,
		// refreshGuests: state.guestReducer.refreshGuests,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			deleteGuest,
		}
	)(GuestPreview)
);
