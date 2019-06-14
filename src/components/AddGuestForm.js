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
		height: '70vh',
		width: '70vw',
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

	componentDidUpdate(prevProps) {
		// reset the form if it's closed
		if (this.props.isOpen !== prevProps.isOpen) {
			this.setState({
				guest_name: '',
				property_id: null,
				email: null,
				cleaner_id: null,
				cleaner: null,
				property: null,
			});
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			guest_name: '',
			property_id: null,
			checkin: null,
			checkout: null,
			email: null,
			cleaner_id: null,
			cleaner: null,
			property: null,
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
			let property = this.props.propertyCleaners.find(
				p => p.property_id === event.target.value
			);
			this.setState({
				[name]: property,
				property_id: event.target.value,
			});
		} else if (name === 'cleaner') {
			let cleaner = this.props.cleaners.find(
				c => c.cleaner_id === event.target.value
			);
			this.setState({
				[name]: cleaner,
				cleaner_id: event.target.value,
			});
		}
	};

	render() {
		const { classes } = this.props;

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
						value={this.state.property}
						onChange={this.handleSelect('property')}
						input={
							<Input name="property" id="property-native-label-placeolder" />
						}
					>
						<option value={null}>{'Select a Property'}</option>
						{this.props.propertyCleaners
							? this.props.propertyCleaners.map(property => {
									return (
										<option
											value={property.property_id}
											key={property.property_id}
										>
											{property.property_name}
											{' - '}
											{property.address}
										</option>
									);
							  })
							: null}
					</NativeSelect>

					<Typography variant="overline">Cleaner</Typography>

					<NativeSelect
						value={this.state.cleaner}
						onChange={this.handleSelect('cleaner')}
						input={
							<Input name="cleaner" id="cleaner-native-label-placeolder" />
						}
					>
						<option value="">{'Select a Cleaner'}</option>
						{this.props.cleaners
							? this.props.cleaners.map(cleaner => {
									return (
										<option value={cleaner.user_id} key={cleaner.user_id}>
											{cleaner.user_name}
										</option>
									);
							  })
							: null}
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
		propertyCleaners: state.propertyReducer.propertyCleaners || [],
		cleaners: state.propertyReducer.cleaners,
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
