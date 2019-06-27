import React from 'react';

// Components
import EditPropertyForm from './EditPropertyForm';

// Cards
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Switch from '@material-ui/core/Switch';


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
import { changeCleaner, deleteProperty, addAvailability, deleteAvailability, } from '../actions/index';

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
			transition: color 0.01s ease-in-out;
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
		display: 'flex',
		maxWidth: '100%',
		margin: '20px auto',
	},
	media: {
		objectFit: 'cover',
	},
	formControl: {
		margin: '20px',
		minWidth: 120,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	available: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: { 
		width: '196px' 
	},
	image: {
		backgroundSize: 'contain',
		width:'25%'
	},
	propertyName:{
		fontWeight:300
	},
	address: {
		fontWeight:200
	},
	infoContainer: {
		width: '75%'
	},
	deleteButton:{
		color: 'darkred'
	}

};

class PropertyPreview extends React.Component {
	// check this property's availability status against the availabilities in state


	componentDidMount(){

		this.setState({
			cleaner_id: this.props.property.cleaner_id || '',
		});

		if(this.props.availableProperties){
			let currentProperty = this.props.property.property_id;

			let searchResult = this.props.availableProperties.find(property => property.property_id === currentProperty);
			if(searchResult || searchResult !== undefined){
				this.setState({
					available: true,
				})
			}
		}
	}

	componentDidUpdate(prevProps){
		if(prevProps.availableProperties !== this.props.availableProperties){
			let currentProperty = this.props.property.property_id;

			let searchResult = this.props.availableProperties.find(property => property.property_id === currentProperty);
			if(searchResult || searchResult !== undefined){
				this.setState({
					available: true,
				})
			}
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			// state
			cleaner_id: '',
			deleteModal: false,
			editModal: false,
			available: false, // default to false until avail can be checked
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

	handleSwitch = name => event => {

		// parse the change to be made
		if(!this.state.available === true){
			this.setState({
				[name]: true,
			})
			this.props.addAvailability(this.props.user.user_id, this.props.property.property_id);
		} else {
			this.setState({
				[name]: false,
			})
			this.props.deleteAvailability(this.props.user.user_id, this.props.property.property_id);
		}

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
						<CardMedia 
							className={classes.image}
							image={property.img_url || "https://www.freeiconspng.com/uploads/no-image-icon-7.gif"}
							alt={property.property_name || 'Property Image'}
						/>
						<div className={classes.infoContainer}>
						<CardContainer>
							<Link to={`/properties/${property.property_id}`}>
								<CardText>
									<Typography variant="h4" className={classes.propertyName}>{property.property_name}</Typography>
									<Typography variant="h5" className={classes.address}>{property.address}</Typography>
								</CardText>
							</Link>

							<CardActions>
								<EditTwoTone onClick={this.toggleEdit} />
								<DeleteForeverTwoTone className={classes.deleteButton} onClick={this.toggleDelete} />
							</CardActions>
						</CardContainer>
						
						<CardFooter>
							<FormControl className={classes.formControl}>
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
								Default Cleaner
							</FormControl>
						</CardFooter>
						</div>
					</Card>
					</div>
	
			);
		} else {
			return (
				<>
				<br></br>
				<Card>
					<CardContainer>
							<Link to={`/properties/${property.property_id}`}>
								<CardText>
									<Typography variant="h4">{property.property_name}</Typography>
									<Typography variant="h5">{property.address}</Typography>
								</CardText>
							</Link>

							<CardActions>
								{!this.props.assigned ? (
								<FormControlLabel control = {<Switch checked = {this.state.available} onChange = {this.handleSwitch('available')} value = 'available' />} label = {this.state.available ? 'Available' : 'Unavailable'} />
								) : (null)}
							</CardActions>
					</CardContainer>
				</Card>
				</>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		// state items
		user: state.authReducer.user || {},
		availableProperties: state.partnerReducer.availableProperties,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			changeCleaner,
			deleteProperty,
			addAvailability,
			deleteAvailability,
		}
	)(withStyles(styles)(PropertyPreview))
);