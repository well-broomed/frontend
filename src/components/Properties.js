// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';

import AddPropertyForm from './AddPropertyForm';

// Styled Components
import styled from 'styled-components';

// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';

// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

import Typography from '@material-ui/core/Typography';

// Icons
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// Actions
import { checkIfUserExists, getUserProperties, getCleaners } from '../actions';
import PropertyPreview from './PropertyPreview';

const TopBar = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
`;

const styles = {
	card: {
		maxWidth: 600,
		margin: '20px auto'
	},
	media: {
		objectFit: 'cover'
	},
	addIcon: {
		fontSize: '5rem',
		cursor: 'pointer'
	}
};

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class Properties extends React.Component {
	componentDidMount() {

		if(!localStorage.getItem('jwt')){
			this.props.history.replace('/');
		} else if(!localStorage.getItem('userInfo')){
			this.props.checkIfUserExists(localStorage.getItem('role') || localStorage.getItem('accountType'));
		}

		this.props.getUserProperties();
		this.props.getCleaners();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.refreshProperties !== this.props.refreshProperties) {
			this.props.getUserProperties();
		}

		if(prevProps.refreshCleaners !== this.props.refreshCleaners && localStorage.getItem('role') === 'manager'){
			this.props.getCleaners();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			addModal: false
		};
	}

	handleModalOpen = () => {
		this.setState({
			addModal: true
		});
	};

	handleModalClose = () => {
		this.setState({
			addModal: false
		});
	};

	render() {
		// const { anchorEl } = this.state;
		// const open = Boolean(anchorEl);
		const { classes } = this.props;
		const role = localStorage.getItem('role');
		const properties = this.props.properties;
		let defaultproperties = [];
		let availableproperties = [];
		if (role !== 'manager' && this.props.properties && this.props.cleaners){
			properties.forEach(property => {
				if (property.cleaner_id === this.props.cleaners[0].user_id)
					defaultproperties.push(property);
				if (property.available === this.props.cleaners[0].user_id)
					availableproperties.push(property);
			});

			console.log(properties)
		}

		if(role === 'manager')
		return (
			<div>
				<TopBar>
					<Typography variant="h2">Properties</Typography>{' '}
					<Fab
						color="primary"
						className={classes.addIcon}
						onClick={this.handleModalOpen}
					>
						<AddIcon />
					</Fab>
				</TopBar>

				<Dialog
					open={this.state.addModal}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.handleModalClose}
				>
					<DialogContent>
						<AddPropertyForm close={this.handleModalClose} />
					</DialogContent>
				</Dialog>

				{this.props.properties ? (
					this.props.properties.map(property => {
						return (
							<PropertyPreview property={property} key={property.property_id} />
						);
					})
				) : (
					<Typography variant="overline">
						No properties have been added yet.
					</Typography>
				)}
			</div>
		);
		else
		return (<div>
			<TopBar>
					<Typography variant="h2">Properties</Typography>{' '}
				</TopBar>
				<Typography variant="h5"> Your Default Properties </Typography>
					{defaultproperties ? (
					defaultproperties.map(property => {
						return (
							<PropertyPreview property={property} key={property.property_id} />
						);
					})
				) : (
					<Typography variant="overline">
						You have not been assigned as the default partner for any properties.
					</Typography>
				)}

				<Typography variant="h5">Properties You're Available For </Typography>
					{availableproperties ? (
					availableproperties.map(property => {
						return (
							<PropertyPreview property={property} key={property.property_id} />
						);
					})
				) : (
					<Typography variant="overline">
						You have not been assigned as the default partner for any properties.
					</Typography>
				)}
		</div>);
		
	}
}

const mapStateToProps = state => {
	return {
		// state items
		properties: state.propertyReducer.properties,
		refreshProperties: state.propertyReducer.refreshProperties,
		cleaners: state.propertyReducer.cleaners,
		userInfo: state.authReducer.userInfo,
		refreshCleaners: state.propertyReducer.refreshCleaners,
		user: state.authReducer.currentUser
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			checkIfUserExists,
			getUserProperties,
			getCleaners,
		}
	)(withStyles(styles)(Properties))
);
