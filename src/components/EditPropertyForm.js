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
    `;

const styles = {
	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		padding: '5%',
		height: '50vh'
	},
	formField: {
		margin: '10px 0px'
	},
	formButton: {
        margin: '10px 0px',
        minHeight: '60px',
        width: '45%',
	}
};

class EditPropertyForm extends React.Component {
    componentDidMount(){
        // assign the initial state for the property form
        this.setState({
            property_name: this.props.property.property_name,
            address: this.props.property.address,
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
				property_name: this.state.property_name,
				address: this.state.address,
            };
            
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
