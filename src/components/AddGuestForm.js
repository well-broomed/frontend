import React from 'react';
// import styled from 'styled-components';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { addGuest } from '../actions/index';

import moment from 'moment';

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
		padding: '20px',
	},
};

class AddGuestForm extends React.Component {
	componentDidMount() {
		this.setState({
			checkin: moment(),
			checkout: moment(),
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			guest_name: '',
			property_id: '',
			checkin: '',
			checkout: '',
			email: '',
			cleaner_id: '',
			cleaner: '',
			property: '',
		};
	}

	handleInput = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		const guestInfo = {
			property_id: this.state.property_id,
			guest_name: this.state.guest_name,
			checkin: this.state.checkin,
			checkout: this.state.checkout,
			email: this.state.email || null,
			cleaner_id: this.state.cleaner_id,
		};

		this.props.addGuest(this.state.property_id, guestInfo);

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
		if (name === 'property') {
			if (!event.target.value) {
				this.setState({
					property: '',
					property_id: '',
					cleaner_id: '',
				});
			} else {
				let property = this.props.propertyCleaners.properties.find(
					p => p.property_id === parseInt(event.target.value)
				);

				this.setState({
					property,
					property_id: property.property_id,
					cleaner_id: property.default_cleaner_id || '',
				});
			}
		} else if (name === 'cleaner') {
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
		}
	};

	render() {
		const { classes } = this.props;

		const availableCleaners =
			this.state.property &&
			this.props.propertyCleaners.availableCleaners[this.state.property_id]
				.concat(
					this.props.propertyCleaners.otherCleaners.filter(
						cleaner =>
							!this.props.propertyCleaners.availableCleaners[
								this.state.property_id
							].find(({ cleaner_id }) => cleaner_id === cleaner.cleaner_id)
					)
				)
				.map(({ cleaner_id, cleaner_name }) => (
					<option key={cleaner_id} value={cleaner_id}>
						{cleaner_name}
					</option>
				));

		return (
			<div>
				<form
					onSubmit={this.handleSubmit}
					className={classes.container}
					noValidate
					autoComplete="off"
				>
					<Typography variant="h4">Add a New Guest</Typography>

					<Typography variant="overline">Property</Typography>

					<NativeSelect
						value={this.state.property && this.state.property_id}
						onChange={this.handleSelect('property')}
						input={
							<Input name="property" id="property-native-label-placeolder" />
						}
					>
						<option value={''}>{'Select a Property'}</option>
						{this.props.propertyCleaners
							? this.props.propertyCleaners.properties.map(property => {
									return (
										<option
											key={property.property_id}
											value={property.property_id}
										>
											{property.property_name}
											{' - '}
											{property.address}
										</option>
									);
							  })
							: ''}
					</NativeSelect>

					<Typography variant="overline">Cleaner</Typography>

					<NativeSelect
						value={
							(this.state.property && this.state.cleaner_id) ||
							(this.state.property && this.state.property.default_cleaner_id) ||
							''
						}
						onChange={this.handleSelect('cleaner')}
						input={
							<Input name="cleaner" id="cleaner-native-label-placeolder" />
						}
					>
						<option value="">{'Select a Cleaner'}</option>
						{availableCleaners}
					</NativeSelect>

					<Typography variant="caption">
						Cleaners with a * have not set themselves as available for this
						property
					</Typography>

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

					<Button
						className={classes.formButton}
						variant="contained"
						color="primary"
						type="submit"
					>
						Add Reservation
					</Button>
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
			addGuest,
		}
	)(withStyles(styles)(AddGuestForm))
);
