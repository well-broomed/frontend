import React from 'react';
// import styled from 'styled-components';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { updateProperty, uploadImage, clearImage } from '../actions/propertyActions';

// Form Components

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

import noImage from '../images/no-image.gif';

const FormButtonRow = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
	margin-top: 15px;
	`;
	
const PropertyImg = styled.img`
	width: 45%;
	height: 95px;
	background: lightgray;
	object-fit: contain;
	@media (min-width: 960px) {

	}
`;

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
			margin: '10px 0px',
			minHeight: '60px',
			width: '45%'
		}
	},
	[theme.breakpoints.up('md')]: {
		formButton: {
			margin: '10px 0px',
			minHeight: '60px',
			width: '45%'
		}
	}
});

class EditPropertyForm extends React.Component {
    componentDidMount(){
        // assign the initial state for the property form
        this.setState({
            property_name: this.props.property.property_name,
			address: this.props.property.address,
			img_url: this.props.property.img_url,
		})
		this.props.clearImage();
    }

	constructor(props) {
		super(props);

		this.state = {
			editModal: false,
			property_name: '',
			address: '',
		};
	}

	handleImage = ({ target }) => {
		this.props.clearImage();
		this.props.uploadImage(target.files[0]);
  };

	handleInput = name => event => {
		this.setState({
			[name]: event.target.value
        });
	};

	handleSubmit = event => {
		event.preventDefault();

		if(this.state.property_name === ''){
			window.alert('Property must have a name.')
		} else if(this.state.address === ''){
			window.alert('Property must have an address.')
		} else {
			const property = {
				"property_name": this.state.property_name,
				address: this.state.address,
			}

			// only send an image change if present in state
			if(this.props.image_url){
				property.img_url = this.props.image_url
			}
            
    		this.props.updateProperty(this.props.property.property_id, property);
			this.props.close();
		}
    };
    
    handleCancel = () => {
        this.props.close();
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
					<Typography variant="h4">Edit Property</Typography>

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
					<FormButtonRow>
					<Button className={classes.formButton} component="label" variant = 'contained' color="default">
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
					<PropertyImg src={this.props.image_url ? this.props.image_url : this.props.property.img_url || noImage}/>

					
					</FormButtonRow>
                    <FormButtonRow>
                    <Button className = {classes.formButton} variant = 'outlined' onClick = {this.handleCancel}>
                        Cancel
                    </Button>
					{this.props.uploading_image ?
					<Button
						className={classes.formButton}
						variant="contained"
						color="primary"
					>
						Please Wait
					</Button> 
					: 
					<Button
						className={classes.formButton}
						variant="contained"
						color="primary"
						type="submit"
					>
						Submit Changes
					</Button> }
                    </FormButtonRow>

                    
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
			updateProperty,
			uploadImage,
			clearImage
			
		}
	)(withStyles(styles)(EditPropertyForm))
);
