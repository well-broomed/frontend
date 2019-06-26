import React from 'react';
// import styled from 'styled-components';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { addProperty } from '../actions/propertyActions';

// Form Components

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		padding: '5%',
		height: '65vh'
	},
	formField: {
		margin: '10px 0px'
	},
	[theme.breakpoints.down('sm')]: {
		formButton: {
			margin: '25px 0 0 0',
			minHeight: '60px'
		},
		imageButton: {
		margin: '25px 0 0 0',
		}
	},
	[theme.breakpoints.up('md')]: {
		formButton: {
			width: '35%',
			margin: '25px auto 0',
		},
		imageButton: {
			width: '35%',
			margin: '25px auto 0',
		}
		
	}
});

class AddPropertyForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			addModal: false,
			property_name: '',
			address: '',
			uploaded: '',
			image: null,
			cleaner_id: null,
			guest_guide: null,
			assistant_guide: null
		};
	}

	handleInput = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	handleImage = ({ target }) => {
		this.setState({image: target.files[0], uploaded: target.files[0].name});
  };

	handleSubmit = event => {
		event.preventDefault();
		console.log(this.state);
		if(this.state.property_name === ''){
			window.alert('Property must have a name.')
		} else if(this.state.address === ''){
			window.alert('Property must have an address.')
		} else {
			
			const propertyForm = new FormData();
			propertyForm.append("property_name", this.state.property_name);
			propertyForm.append("address", this.state.address);
			propertyForm.append("File", this.state.image, this.state.image.name);
			propertyForm.append("cleaner_id", this.state.cleaner_id);
			propertyForm.append("guest_guide", this.state.guest_guide);
			propertyForm.append("assistant_guide", this.state.assistant_guide);
			
	
			this.props.addProperty(propertyForm);
			this.props.close();
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
					<Typography variant="h4">Add a New Property</Typography>

					<TextField
						className={classes.formField}
						id="standard-dense"
						label="Property Name"
						value={this.state.property_name}
						onChange={this.handleInput('property_name')}
					/>
					<TextField
						className={classes.formField}
						id="standard-dense"
						label="Address"
						value={this.state.address}
						onChange={this.handleInput('address')}
					/>

					<TextField
						className={classes.formField}
						id="standard-dense"
						label="Guest Guide URL"
						value={this.state.guest_guide}
						onChange={this.handleInput('guest_guide')}
					/>
					<TextField
						className={classes.formField}
						id="standard-dense"
						label="Assistant Guide URL"
						value={this.state.assistant_guide}
						onChange={this.handleInput('assistant_guide')}
					/>
					
					<Button
						variant="contained"
						component="label"
						className={classes.imageButton}
					>
						{this.state.uploaded
							? `File Uploaded: ${this.state.uploaded}`
							: 'Upload Image'}
						<input
							value={undefined}
							accept="image/*"
							onChange={this.handleImage}
							type="file"
							style={{ display: 'none' }}
						/>
					</Button>
					<Button
						className={classes.formButton}
						variant="contained"
						color="primary"
						type="submit"
					>
						Add Property
					</Button>
	
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			addProperty
		}
	)(withStyles(styles)(AddPropertyForm))
);
