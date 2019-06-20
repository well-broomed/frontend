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
import { getUserProperties } from '../actions';
import PropertyPreview from './PropertyPreview';

const TopBar = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	margin: 0 0 20px;
`;

const styles = {
	title: { padding: '10px 0 0' },
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

		if (!(properties && user.user_id)) {
			return null;
		} else if (role === 'manager')
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
						onClose={this.handleModalClose}
						fullWidth={true}
						maxWidth={'xl'}
					>
						<DialogContent>
							<AddPropertyForm close={this.handleModalClose} />
						</DialogContent>
					</Dialog>

					{properties.length ? (
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
		else {
			const defaultProperties = properties.filter(
				({ cleaner_id }) => cleaner_id === user.user_id
			);

			const availableProperties = properties.filter(
				({ cleaner_id, available }) => cleaner_id !== user.user_id && available
			);

			const otherProperties = properties.filter(
				({ cleaner_id, available }) => cleaner_id !== user.user_id && !available
			);

			return (
				<div>
					<TopBar>
						<Typography variant="h2">Properties</Typography>{' '}
					</TopBar>
					{defaultProperties.length ? (
						<React.Fragment>
							<Typography variant="h5" className={classes.title}>
								Your Default Properties
							</Typography>
							{properties
								.filter(({ cleaner_id }) => cleaner_id === user.user_id)
								.map(property => {
									return (
										<PropertyPreview
											property={property}
											key={property.property_id}
										/>
									);
								})}
						</React.Fragment>
					) : null}

					<Typography variant="h5" className={classes.title}>
						Properties You're Available For
					</Typography>
					{availableProperties.length ? (
						availableProperties.map(property => {
							return (
								<PropertyPreview
									property={property}
									key={property.property_id}
								/>
							);
						})
					) : (
						<Typography variant="overline">
							You have not made yourself available to any properties.
						</Typography>
					)}

					{otherProperties.length ? (
						<React.Fragment>
							<Typography variant="h5" className={classes.title}>
								Other Properties
							</Typography>
							{otherProperties.map(property => (
								<PropertyPreview
									property={property}
									key={property.property_id}
								/>
							))}
						</React.Fragment>
					) : null}
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		// state items
		user: state.authReducer.user,
		properties: state.propertyReducer.properties,
		refreshProperties: state.propertyReducer.refreshProperties,
		userChecked: state.authReducer.userChecked,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			getUserProperties,
		}
	)(withStyles(styles)(Properties))
);
