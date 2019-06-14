import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
// import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { changeCleaner } from '../actions/propertyActions';

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
	componentDidMount() {
		if (this.props.cleaners) {
			let defaultCleaner;
			if (this.props.property.cleaner_id === null) {
				defaultCleaner = this.props.cleaners.reduce((cleaners, cleaner) => {
					if (cleaner.user_id === this.props.property.manager_id) {
						cleaners.push(cleaner);
					}
					return cleaners;
				});
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
			cleaner: null
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

	render() {
		const { classes } = this.props;
		const role = localStorage.getItem('role')

		if(role === 'manager')
		return (
			<div>
				<Card className={classes.card} key={this.props.property.id}>
					<Link to={`/properties/${this.props.property.property_id}`}>
						<CardHeader
							title={this.props.property.property_name}
							subheader={this.props.property.address}
						/>
					</Link>

					<CardContent>
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
					</CardContent>
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
			changeCleaner
		}
	)(withStyles(styles)(PropertyPreview))
);
