import React from 'react';
// import styled from 'styled-components';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import { updateProperty } from '../actions/propertyActions';

// Form Components

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

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
			image: '',
			uploaded: ''
        })
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
		this.setState({image: target.files[0], uploaded: target.files[0].name, imageSrc: window.URL.createObjectURL(target.files[0])});
		console.log(target.files)
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
			const propertyForm = new FormData();
			propertyForm.append("property_name", this.state.property_name);
			propertyForm.append("address", this.state.address);
			propertyForm.append("File", this.state.image, this.state.image.name);
            
    		this.props.updateProperty(this.props.property.property_id, propertyForm);
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
						{this.state.uploaded
							? `File Uploaded: ${this.state.uploaded}`
							: 'Change Image'}
						<input
							value={undefined}
							accept="image/*"
							onChange={this.handleImage}
							type="file"
							style={{ display: 'none' }}
						/>
					</Button>
					<PropertyImg src={this.state.uploaded ? this.state.imageSrc : this.props.property.img_url || "https://www.freeiconspng.com/uploads/no-image-icon-7.gif"}/>

					
					</FormButtonRow>
                    <FormButtonRow>
                    <Button className = {classes.formButton} variant = 'outlined' onClick = {this.handleCancel}>
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
                    </FormButtonRow>

                    
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
			updateProperty
		}
	)(withStyles(styles)(EditPropertyForm))
);
