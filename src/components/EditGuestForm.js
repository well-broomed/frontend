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
		height: '70vh',
		width: '70vw',
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
			email: null,
			checkin: null,
			checkout: null,
			cleaner_id: null,
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
			email: this.state.email || null,
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
		if (name === 'property') {
			let property = this.props.properties.find(
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

	handleClose = event => {
		this.props.close();
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
						<option value={this.props.guest.cleaner_id}>
							{this.props.guest.cleaner_name}
						</option>
						{this.props.cleaners
							? this.props.cleaners.reduce((cleaners, cleaner) => {
									if (cleaner.user_id !== this.props.guest.cleaner_id) {
										cleaners.push(
											<option value={cleaner.user_id} key={cleaner.user_id}>
												{cleaner.user_name}
											</option>
										);
									}
									return cleaners;
							  }, [])
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
		properties: state.propertyReducer.properties,
		cleaners: state.propertyReducer.cleaners,
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
