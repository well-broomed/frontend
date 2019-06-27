import React from 'react';
// import styled from 'styled-components';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { addProperty, uploadImage, clearImage } from '../actions/propertyActions';

import styled from 'styled-components';

// Form Components

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import HelpTwoTone from '@material-ui/icons/HelpTwoTone';

import Typography from '@material-ui/core/Typography';


const styles = theme => ({
	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		padding: '5%',
		height: '70vh'
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

const TopRow = styled.div`

	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	`;

class AddPropertyForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			addModal: false,
			property_name: '',
			address: '',
			cleaner_id: null,
			guest_guide: '',
			assistant_guide: ''
		};
	}

	componentDidMount(){
		this.props.clearImage();
	}

	handleInput = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	handleImage = ({ target }) => {
		this.props.clearImage();
		this.props.uploadImage(target.files[0]);
  };

	handleSubmit = event => {
		event.preventDefault();
		console.log(this.state);
		if(this.state.property_name === ''){
			window.alert('Property must have a name.')
		} else if(this.state.address === ''){
			window.alert('Property must have an address.')
		} else {
			
			const property = {
				"property_name" : this.state.property_name,
				"address" : this.state.address,
				"img_url": this.props.image_url,
				"cleaner_id" : this.state.cleaner_id,
				"guest_guide" : this.state.guest_guide,
				"assistant_guide" : this.state.assistant_guide,
			}
	
			this.props.addProperty(property);
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
					<TopRow>
					<Typography variant="h4">Add a New Property</Typography>
					<Tooltip 
					title = 'Guest Guide and Assistant Guide URLs will link to documents that outline guest and assistant guidelines, respectively.'>
						<HelpTwoTone />
					</Tooltip>
					</TopRow>

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
						label="Guest Guide URL (Optional)"
						value={this.state.guest_guide}
						onChange={this.handleInput('guest_guide')}
					/>
					

					<TextField
						className={classes.formField}
						id="standard-dense"
						label="Assistant Guide URL (Optional)"
						value={this.state.assistant_guide}
						onChange={this.handleInput('assistant_guide')}
					/>

					<Button
						variant="contained"
						component="label"
						className={classes.imageButton}
					>
						{this.props.image_url ? (
							`Image Uploaded!`
						) : this.props.uploadingError ? (
							'Error Uploading'
						) : this.props.uploading_image ? (
							<CircularProgress className={classes.progress} />
						) : (
							'Upload Image'
						)}
						<input
							value={undefined}
							accept="image/*"
							onChange={this.handleImage}
							type="file"
							style={{ display: 'none' }}
						/>
					</Button>
					{this.props.uploading_image ? (
						<Button
							className={classes.formButton}
							variant="contained"
							color="primary"
						>
							Please Wait
						</Button>
					) : (
						<Button
							className={classes.formButton}
							variant="contained"
							color="primary"
							type="submit"
						>
							Add Property
						</Button>
					)}
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		uploading_image: state.propertyReducer.uploading_image,
		image_url: state.propertyReducer.image_url,
		uploadingError: state.propertyReducer.uploadingError
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			addProperty,
			uploadImage,
			clearImage
		}
	)(withStyles(styles)(AddPropertyForm))
);
