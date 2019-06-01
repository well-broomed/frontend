import React from 'react';
// import styled from 'styled-components';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { addGuest } from '../actions/index';

import moment from 'moment';

import { DateTimePicker } from "@material-ui/pickers";

// Form Components

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
		margin: '10px 0px'
	}
};

class AddGuestForm extends React.Component {

    componentDidMount(){
        this.setState({
            checkin: moment(),
            checkout: moment(),
        })
    }

	constructor(props) {
		super(props);

		this.state = {
			addModal: false,
			guest_name: '',
			property_id: null,
			checkin: null,
			checkout: null,
			email: null,
			cleaner_id: null
		};
	}

	handleInput = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		const guestInfo = {
            property_id: null,
            guest_name: this.state.guest_name,
            checkin: this.state.checkin,
            checkout: this.state.checkout,
            email: this.state.email,
            cleaner_id: null
        };

        console.log(guestInfo);
		// this.props.addGuest(guestInfo);
		// this.props.close();
    };
    
    handleCheckin = event => {
        this.setState({
            checkin: event.format(),
        })
    }

    handleCheckout = event => {
        this.setState({
            checkout: event.format(),
        })
    }

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

					<TextField
						className={classes.formField}
						id="standard-dense"
						label="Guest Name"
						value={this.state.guest_name}
						onChange={this.handleInput('guest_name')}
					/>

                    <Typography variant = 'overline'>
                        Check-In
                    </Typography>
                    <DateTimePicker
                        inputVariant="outlined"
                        name = 'checkin'
                        value={this.state.checkin}
                        onChange={this.handleCheckin}
                    />

                    <Typography variant = 'overline'>
                        Check-Out
                    </Typography>
                    <DateTimePicker
                        inputVariant="outlined"
                        name = 'checkout'
                        value={this.state.checkout}
                        onChange={this.handleCheckout}
                    />
					
					<Button
						className={classes.formButton}
						variant="outlined"
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
        properties: state.propertyReducer.properties,
        cleaners: state.propertyReducer.cleaners,

	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			addGuest
		}
	)(withStyles(styles)(AddGuestForm))
);
