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
import { getUserProperties, getAvailableProperties } from '../actions/index';
import PropertyPreview from './PropertyPreview';

const TopBar = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	padding: 20px 0px;
`;

const styles = {
	card: {
		maxWidth: 600,
		margin: '20px auto',
	},
	media: {
		objectFit: 'cover',
	},
	addIcon: {
		fontSize: '5rem',
		cursor: 'pointer',
	},
};

const Transition = React.forwardRef((props, ref) => (
	<Slide direction="up" {...props} ref={ref} />
));

class Properties extends React.Component {
	componentDidMount() {
		if (!localStorage.getItem('jwt')) {
			this.props.history.replace('/');
		}
		this.props.getUserProperties();
	}

	componentDidUpdate(prevProps) {
		// refreshProperties will be set to true once the user is checked
		if (prevProps.refreshProperties !== this.props.refreshProperties) {
			this.props.getUserProperties();
		}

		if(prevProps.user !== this.props.user){
			if(this.props.user.role !== 'manager'){
				this.props.getAvailableProperties();
			}
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			addModal: false,
		};
	}

	handleModalOpen = () => {
		this.setState({
			addModal: true,
		});
	};

	handleModalClose = () => {
		this.setState({
			addModal: false,
		});
	};

	render() {
		// const { anchorEl } = this.state;
		// const open = Boolean(anchorEl);
		const { classes } = this.props;
		const role = (this.props.user && this.props.user.role) || null;
		const { user, properties } = this.props;

		// Collect assigned Assistant Properties if user is an assistant
		let asstProperties = [];
		if(role !== 'manager' && this.props.properties){
			if(user){
				asstProperties = this.props.properties.filter(property => property.cleaner_id === user.user_id);
			}
		}

		if (role === 'manager')
			return (
				<div>
					{/** Manager View */}
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
						onClose={this.handleModalClose}
						fullWidth={true}
						maxWidth={'md'}
					>
						<DialogContent>
							<AddPropertyForm close={this.handleModalClose} />
						</DialogContent>
					</Dialog>

					{this.props.properties ? (
						properties.map(property => {
							return (
								<PropertyPreview
									property={property}
									key={property.property_id}
								/>
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
			return (
				<div>
					{/** Assistant View */}
					<TopBar>
						<Typography variant="h2">Properties</Typography>{' '}
					</TopBar>
					<Typography variant="h4">ASSIGNED PROPERTIES</Typography>

					{/** Assigned Properties */}
					{this.props.properties ? (

						<>
						{asstProperties.length > 0 ? (
							<>
							{asstProperties
								.map(property => {
									return (
										<PropertyPreview property = {property} key = {property.property_id} assigned = {true}/>
									)
								})}
							</>

						) : (
							<div style = {{margin: '20px 0px'}}>
							<Typography variant="overline">
							You have not been assigned as the default partner for any
							properties.
							</Typography>
							</div>
						)}
						</>
					) : (
						<div style = {{margin: '20px 0px'}}>
						<Typography variant="overline">
							There are no properties available to you.
						</Typography>
						</div>
					) }
					<div style = {{margin: '40px 0px 0px 0px'}}>
					<Typography variant="h4">POTENTIAL PROPERTIES</Typography>
					</div>
					
					{/** Available Properties */}
					{/** These are all properties from all managers */}
					<Typography variant = 'overline'>Mark yourself available to be assigned for shifts.</Typography>
					<br></br>

					{this.props.properties ? (
						this.props.properties
							.map(property => {
								return (
									<PropertyPreview
										property={property}
										key={property.property_id}
									/>
								);
							})
					) : (
						<Typography variant="overline">
							There are no properties available to you.
						</Typography>
					)}
				</div>
			);
	}
}
const mapStateToProps = state => {
	return {
		// state items
		user: state.authReducer.user,
		properties: state.propertyReducer.properties,
		refreshProperties: state.propertyReducer.refreshProperties,
		userChecked: state.authReducer.userChecked,
		availableProperties: state.partnerReducer.availableProperties,
		refreshAvailable: state.partnerReducer.refreshAvailable,
	};
};
export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			getUserProperties,
			getAvailableProperties,
		}
	)(withStyles(styles)(Properties))
);