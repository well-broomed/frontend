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
import { changeCleaner, deleteProperty } from '../actions/propertyActions';

const CardContainer = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	padding: 20px;

	a{
		color: black;
		text-decoration: none;
		width: 100%;
	}
`;

const CardText = styled.div``;

const CardFooter = styled.div`
	`;

const CardActions = styled.div`
	width: auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-start;
	justify-content: flex-end;

	svg{
		cursor: pointer;
		font-size: 3rem;
	}
`;


const styles = {
	card: {
		maxWidth: '100%',
		margin: '20px auto'
	},
	media: {
		objectFit: 'cover'
	},
	formControl: {
		margin: '20px',
		minWidth: 120
	}
};

class PropertyPreview extends React.Component {

	componentDidMount(){
		if(this.props.cleaners){
			let defaultCleaner;
			if(this.props.property.cleaner_id === null){
				defaultCleaner = this.props.cleaners.filter(
					cleaner => cleaner.user_id === this.props.property.manager_id
				)[0];
			} else {
				defaultCleaner = this.props.cleaners.filter(
					cleaner => cleaner.user_id === this.props.property.cleaner_id
				)[0];
			}
			
			this.setState({
				cleaner: defaultCleaner
			})
		}
	}

	componentDidUpdate(oldProps) {
		if (this.props.cleaners !== oldProps.cleaners) {
			let defaultCleaner;
			if (this.props.property.cleaner_id === null) {
				defaultCleaner = this.props.cleaners.filter(
					cleaner => cleaner.user_id === this.props.property.manager_id
				)[0];
			} else {
				defaultCleaner = this.props.cleaners.filter(
					cleaner => cleaner.user_id === this.props.property.cleaner_id
				)[0];
			}

			this.setState({
				cleaner: defaultCleaner
			});
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			// state
			cleaner: null,
			deleteModal: false,
			editModal: false,
		};
	}

	handleSelect = event => {
		const selectedCleaner = this.props.cleaners.filter(
			cleaner => cleaner.user_id === event.target.value
		);
		this.setState({
			cleaner: selectedCleaner
		});

		this.props.changeCleaner(
			this.props.property.property_id,
			event.target.value
		);
	};

	toggleDelete = () => {
		this.setState({
			deleteModal: !this.state.deleteModal
		})
	}

	handleDelete = () => {
		this.props.deleteProperty(this.props.property.property_id);

		this.toggleDelete();
	}

	toggleEdit = () => {
		this.setState({
			editModal: !this.state.editModal
		})
	}

	render() {
		const { classes } = this.props;
		const role = localStorage.getItem('role')

		if(role === 'manager')
		return (
			<div>

			{/** Delete Modal **/}
			<Dialog open = {this.state.deleteModal} onClose = {this.toggleDelete}>
				<DialogContent>
					<Typography variant = 'h6'>Are you sure you want to delete {this.props.property.property_name}?</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick = {this.toggleDelete} variant = 'outlined' color = 'primary'>
						Cancel
					</Button>
					<Button onClick = {this.handleDelete} variant = 'contained' color = 'secondary'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

			{/** Edit Modal **/}
			<Dialog open = {this.state.editModal} onClose = {this.toggleEdit} fullWidth={true} maxWidth = 'xl'>
				<DialogContent>
					<EditPropertyForm close = {this.toggleEdit} property = {this.props.property} />
				</DialogContent>
			</Dialog>

			{/** Property Card */}

				<Card className={classes.card} key={this.props.property.id}>
					<CardContainer>
					<Link to = {`/properties/${this.props.property.property_id}`}>

						<CardText>
							<Typography variant = 'h4'>{this.props.property.property_name}</Typography>
							<Typography variant = 'h5'>{this.props.property.address}</Typography>
						</CardText>
					</Link>

						<CardActions>
						<EditTwoTone onClick = {this.toggleEdit} />
						<DeleteForeverTwoTone onClick = {this.toggleDelete} />
						</CardActions>
					</CardContainer>
					<CardFooter>
					<FormControl className={classes.formControl}>
							<InputLabel shrink htmlFor="cleaner-native-label-placeholder">
								Default Cleaner
							</InputLabel>
								<NativeSelect
									onChange={this.handleSelect}
									input={
										<Input
											name="cleaner"
											id="cleaner-native-label-placeholder"
										/>
									}
								>
									<option value="">{this.state.cleaner ? this.state.cleaner.user_name : "Unassigned"}</option>
									{this.props.cleaners
										? this.props.cleaners.map(cleaner => {
												if (this.state.cleaner && cleaner.user_id === this.state.cleaner.user_id)
													return null;
												return (
													<option value={cleaner.user_id} key={cleaner.user_id}>
														{cleaner.user_name}
													</option>
												);
										  })
										: null}
								</NativeSelect>
						</FormControl>
					</CardFooter>
				</Card>
			</div>
		);

		else
		return (
			<Card className={classes.card} key={this.props.property.id}>
					<Link to={`/properties/${this.props.property.property_id}`}>
						<CardHeader
							title={this.props.property.property_name}
							subheader={this.props.property.address}
						/>
					</Link>

					<CardContent/>
				</Card>

		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		cleaners: state.propertyReducer.cleaners,
		refreshCleaners: state.propertyReducer.refreshCleaners
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			changeCleaner,
			deleteProperty,
		}
	)(withStyles(styles)(PropertyPreview))
);
