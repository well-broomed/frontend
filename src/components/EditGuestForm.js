import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { updateGuest } from '../actions/index';

import styled from 'styled-components';

// import moment from 'moment';

import { DateTimePicker } from '@material-ui/pickers';

// Form Components

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

const styles = {
	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		padding: '5%',
	},
	formField: {
		margin: '10px 0px',
	},
	formButton: {
		margin: '10px 0px',
	},
};

const FormButtons = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;

	button {
		width: 45%;
		min-height: 80px;
		padding: 10px;
	}
`;

class EditGuestForm extends React.Component {
	componentDidMount() {
		// set the initial state to be the passed guest prop
		// the property is fixed, as the checklist is dependent on this
		// to change the property, a new reservation must be created
		// this form only manages date changes, cleaner changes, and name/email changes

		this.setState({
			guest_name: this.props.guest.guest_name,
			email: this.props.guest.email,
			checkin: this.props.guest.checkin,
			checkout: this.props.guest.checkout,
			cleaner_id: this.props.guest.cleaner_id,
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			guest_name: '',
			checkin: '',
			checkout: '',
			email: '',
			property: '',
			property_id: '',
			cleaner_id: '',
		};
	}

	handleInput = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		const guestChanges = {
			property_id: this.props.guest.property_id,
			guest_name: this.state.guest_name,
			checkin: this.state.checkin,
			checkout: this.state.checkout,
			email: this.state.email || '',
			cleaner_id: this.state.cleaner_id,
		};

		this.props.updateGuest(this.props.guest.guest_id, guestChanges);

		this.props.close();
	};

	handleCheckin = event => {
		this.setState({
			checkin: event.format(),
		});
	};

	handleCheckout = event => {
		this.setState({
			checkout: event.format(),
		});
	};

	handleSelect = name => event => {
		/** Not needed til reassigning property is enabled on backend */
		// if (name === 'property') {
		// 	if (!event.target.value) {
		// 		this.setState({
		// 			property: '',
		// 			property_id: '',
		// 			cleaner_id: '',
		// 		});
		// 	} else {
		// 		let property = this.props.propertyCleaners.properties.find(
		// 			p => p.property_id === parseInt(event.target.value)
		// 		);

		// 		this.setState({
		// 			property,
		// 			property_id: property.property_id,
		// 			cleaner_id: property.default_cleaner_id || '',
		// 		});
		// 	}
		// } else if (name === 'cleaner') {
		if (!event.target.value) {
			this.setState({
				cleaner_id: '',
			});
		} else {
			let cleaner = this.props.propertyCleaners.otherCleaners.find(
				c => c.cleaner_id === parseInt(event.target.value)
			);

			this.setState({
				cleaner_id: cleaner.cleaner_id,
			});
		}
		// }
	};

	handleClose = event => {
		this.props.close();
	};

	render() {
		const { classes } = this.props;

		const availableCleaners = this.props.propertyCleaners.availableCleaners
			? this.props.propertyCleaners.availableCleaners[
					this.props.guest.property_id
			  ]
					.concat(
						this.props.propertyCleaners.otherCleaners.filter(
							cleaner =>
								!this.props.propertyCleaners.availableCleaners[
									this.props.guest.property_id
								].find(({ cleaner_id }) => cleaner_id === cleaner.cleaner_id)
						)
					)
					.filter(
						({ cleaner_id }) => cleaner_id !== this.props.guest.cleaner_id
					)
					.map(({ cleaner_id, cleaner_name }) => (
						<option key={cleaner_id} value={cleaner_id}>
							{cleaner_name}
						</option>
					))
			: [];

		return (
			<div>
				<form
					onSubmit={this.handleSubmit}
					className={classes.container}
					noValidate
					autoComplete="off"
				>
					<Typography variant="h4">Edit Guest Information</Typography>

					<Typography variant="overline">Property</Typography>

					<Typography variant="h6">{this.props.guest.property_name}</Typography>

					<Typography variant="overline">Cleaner</Typography>

					<NativeSelect
						value={this.state.cleaner}
						onChange={this.handleSelect('cleaner')}
						input={
							<Input name="cleaner" id="cleaner-native-label-placeolder" />
						}
					>
						<option value={this.props.guest.cleaner_id || ''}>
							{this.props.guest.cleaner_name}
						</option>
						{availableCleaners}
					</NativeSelect>

					<TextField
						className={classes.formField}
						id="standard-dense"
						label="Guest Name"
						value={this.state.guest_name}
						onChange={this.handleInput('guest_name')}
					/>

					<Typography variant="overline">Check-In</Typography>
					<DateTimePicker
						inputVariant="outlined"
						name="checkin"
						value={this.state.checkin}
						onChange={this.handleCheckin}
					/>

					<Typography variant="overline">Check-Out</Typography>
					<DateTimePicker
						inputVariant="outlined"
						name="checkout"
						value={this.state.checkout}
						onChange={this.handleCheckout}
					/>

					<FormButtons>
						<Button
							className={classes.formButton}
							variant="outlined"
							onClick={this.handleClose}
						>
							Cancel
						</Button>
						<Button
							className={classes.formButton}
							variant="contained"
							color="primary"
							type="submit"
						>
							Submit Changes
						</Button>
					</FormButtons>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		user: state.authReducer.user,
		propertyCleaners: state.propertyReducer.propertyCleaners || [],
		cleaners: state.propertyReducer.cleaners || [],
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			updateGuest,
		}
	)(withStyles(styles)(EditGuestForm))
);
