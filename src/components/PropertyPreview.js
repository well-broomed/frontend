import React from 'react';

// Components
import EditPropertyForm from './EditPropertyForm';

// Cards
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

// Dialog Modals
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';

// Icons
import DeleteForeverTwoTone from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoTone from '@material-ui/icons/EditTwoTone';

// Dependencies
import styled from 'styled-components';
import { withStyles } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import {
	changeCleaner,
	deleteProperty,
	changeAvailableCleaner,
} from '../actions/propertyActions';

const CardContainer = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	padding: 20px;

	a {
		color: black;
		text-decoration: none;
		width: 100%;
	}
`;

const CardText = styled.div`
	transition: color 0.1s ease-in-out;
	:hover{
			color: #3f51b5;
			transition: color 0.2s ease-in-out;
		}
	`;

const CardFooter = styled.div``;

const CardActions = styled.div`
	width: auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-start;
	justify-content: flex-end;

	svg {
		cursor: pointer;
		font-size: 3rem;
	}
`;

const styles = {
	card: {
		maxWidth: '600px',
		margin: '12px 0 20px 0',
	},
	media: {
		objectFit: 'cover',
	},
	formControl: {
		margin: '20px',
		minWidth: 120,
	},
	available: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: { width: '196px' },
};

class PropertyPreview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// state
			cleaner_id: '',
			deleteModal: false,
			editModal: false,
		};
	}

	handleSelect = event => {
		this.setState({
			cleaner_id: event.target.value,
		});

		this.props.changeCleaner(
			this.props.property.property_id,
			event.target.value || null
		);
	};

	handleMakeAvailable = available => {
		this.props.changeAvailableCleaner(
			this.props.property.property_id,
			null,
			available
		);
	};

	toggleDelete = () => {
		this.setState({
			deleteModal: !this.state.deleteModal,
		});
	};

	handleDelete = () => {
		this.props.deleteProperty(this.props.property.property_id);

		this.toggleDelete();
	};

	toggleEdit = () => {
		this.setState({
			editModal: !this.state.editModal,
		});
	};

	componentDidMount() {
		this.setState({
			cleaner_id: this.props.property.cleaner_id || '',
		});
	}

	render() {
		const { classes, user, property } = this.props;
		const role = user.role;

		const availableCleaners = property.availableCleaners;

		// Just in case someone's set as default without also being available. Shouldn't happen but it's not explicitly disallowed on the backend (yet)
		if (
			property.cleaner_id &&
			availableCleaners &&
			!availableCleaners.find(
				({ cleaner_id }) => cleaner_id === parseInt(property.cleaner_id)
			)
		) {
			availableCleaners.push({
				cleaner_id: property.cleaner_id,
				cleaner_name: property.cleaner_name,
			});
		}

		if (role === 'manager') {
			return (
				<div>
					{/** Delete Modal **/}
					<Dialog open={this.state.deleteModal} onClose={this.toggleDelete}>
						<DialogContent>
							<Typography variant="h6">
								Are you sure you want to delete {property.property_name}?
							</Typography>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={this.toggleDelete}
								variant="outlined"
								color="primary"
							>
								Cancel
							</Button>
							<Button
								onClick={this.handleDelete}
								variant="contained"
								color="secondary"
							>
								Delete
							</Button>
						</DialogActions>
					</Dialog>

					{/** Edit Modal **/}
					<Dialog
						open={this.state.editModal}
						onClose={this.toggleEdit}
						fullWidth={true}
						maxWidth="xl"
					>
						<DialogContent>
							<EditPropertyForm close={this.toggleEdit} property={property} />
						</DialogContent>
					</Dialog>

					{/** Property Card */}

					<Card className={classes.card} key={property.id}>
						<CardContainer>
							<Link to={`/properties/${property.property_id}`}>
								<CardText>
									<Typography variant="h4">{property.property_name}</Typography>
									<Typography variant="h5">{property.address}</Typography>
								</CardText>
							</Link>

							<CardActions>
								<EditTwoTone onClick={this.toggleEdit} />
								<DeleteForeverTwoTone onClick={this.toggleDelete} />
							</CardActions>
						</CardContainer>
						<CardFooter>
							<FormControl className={classes.formControl}>
								<InputLabel shrink htmlFor="cleaner-native-label-placeholder">
									Default Cleaner
								</InputLabel>
								<NativeSelect
									value={this.state.cleaner_id}
									onChange={this.handleSelect}
									input={
										<Input
											name="cleaner"
											id="cleaner-native-label-placeholder"
										/>
									}
								>
									<option value="">Unassigned</option>
									{availableCleaners.map(cleaner => (
										<option value={cleaner.cleaner_id} key={cleaner.cleaner_id}>
											{cleaner.cleaner_name}
										</option>
									))}
								</NativeSelect>
							</FormControl>
						</CardFooter>
					</Card>
				</div>
			);
		} else {
			return (
				<Card className={classes.card} key={property.id}>
					<Link to={`/properties/${property.property_id}`}>
						<CardHeader
							title={property.property_name}
							subheader={property.address}
						/>
					</Link>

					<CardContent className={classes.available}>
						{property.cleaner_id !== user.user_id &&
							(property.available ? (
								<Button
									className={classes.button}
									variant="contained"
									color="default"
									onClick={() => this.handleMakeAvailable(false)}
								>
									Mark as Unavailable
								</Button>
							) : (
								<Button
									className={classes.button}
									variant="contained"
									color="primary"
									onClick={() => this.handleMakeAvailable(true)}
								>
									Mark as Available
								</Button>
							))}
					</CardContent>
				</Card>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		// state items
		user: state.authReducer.user || {},
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			changeCleaner,
			deleteProperty,
			changeAvailableCleaner,
		}
	)(withStyles(styles)(PropertyPreview))
);
