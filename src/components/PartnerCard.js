import React from 'react';
//Redux
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//Redux actions
import {
	changeCleaner,
	changeAvailableCleaner,
} from '../actions/propertyActions';

//Material-ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { withStyles } from '@material-ui/core';

const styles = {
	card: {
		
	},
	img: {
		width: 40,
	},
	content: {
		display: 'flex',
	},
	contentTypography: {
		margin: 'auto',
	},
	paper: {
		maxWidth: 600,
		margin: '20px auto',
		padding: '5px',
		'flex-direction': 'column',
		'align-items': 'center',
		display: 'flex',
	},
};

class PartnerCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			defaultDialog: false,
			availableDialog: false,
		};
	}

	handleDefaultDialogOpen = () => {
		this.setState({ defaultDialog: true });
	};

	handleDefaultDialogClose = property_id => {
		if (property_id) {
			if (
				this.props.partner.defaultProperties.find(
					property => property.property_id === property_id
				)
			)
				this.props.changeCleaner(property_id, null);
			else this.props.changeCleaner(property_id, this.props.partner.cleaner_id);
		}
		this.setState({ defaultDialog: false });
	};

	handleAvailableDialogOpen = () => {
		this.setState({ availableDialog: true });
	};

	handleAvailableDialogClose = property => {
		if (property) {
			if (
				this.props.partner.availableProperties.find(
					({ property_id }) => property_id === property.property_id
				)
			)
				this.props.changeAvailableCleaner(
					property.property_id,
					this.props.partner.cleaner_id,
					false
				);
			else
				this.props.changeAvailableCleaner(
					property.property_id,
					this.props.partner.cleaner_id,
					true
				);
		}
		this.setState({ availableDialog: false });
	};

	handlePartnerHouse = event => {
		this.setState({
			open: !this.state.open,
		});
	};

	render() {
		const { classes, partner, defaultProperties } = this.props;
		// These conditionals are necessary to prevent mapping undefined values (e.g. []) that will crash the application
		let defaultPropertyList = [];
		if (partner.defaultProperties) {
			if (partner.defaultProperties.length > 0) {
				defaultPropertyList = partner.defaultProperties
					.map(property => ({
						...property,
						property_name: property.property_name + ' - click to unassign',
					}))
					.concat(
						partner.defaultProperties
							.filter(
								({ property_id }) =>
									!partner.defaultProperties.find(
										property => property.property_id === property_id
									)
							)
							.map(property => ({
								...property,
								property_name:
									property.property_name +
									(property.cleaner_name
										? ` - currently assigned to ${property.cleaner_name}`
										: ''),
							}))
					);
			}
		}

		// These conditionals are necessary to prevent mapping undefined values (e.g. []) that will crash the application
		let availablePropertyList = [];
		if (partner.availableProperties && defaultProperties) {
			if (
				partner.availableProperties.length > 0 &&
				defaultProperties.length > 0
			) {
				availablePropertyList = partner.availableProperties
					.map(property => ({
						...property,
						property_name: property.property_name + ' - click to unassign',
					}))
					.concat(
						partner.defaultProperties.filter(
							({ property_id }) =>
								!partner.availableProperties.find(
									property => property.property_id === property_id
								)
						)
					);
			}
		}

		return (
			<div>
				<Card key={partner.cleaner_id} className={classes.card}>
					<CardHeader
						title={partner.cleaner_name}
						titleTypographyProps={{ variant: 'h6' }}
						subheader={partner.address}
						avatar={
							<Avatar>
								<img
									alt="partner avatar"
									className={classes.img}
									src={partner.img_url}
								/>
							</Avatar>
						}
						// action={
						// 	<Button
						// 		variant={this.state.open ? 'contained' : 'outlined'}
						// 		onClick={this.handlePartnerHouse}
						// 	>
						// 		House Availability
						// 	</Button>
						// }
					/>
					<CardContent className={classes.content}>
						<Typography component="p" className={classes.contentTypography}>
							Default Properties: {partner.defaultProperties.length}
						</Typography>
						<Typography component="p" className={classes.contentTypography}>
							Available Properties: {partner.availableProperties.length}
						</Typography>
					</CardContent>
				</Card>

				{this.state.open ? (
					<Paper className={classes.paper}>
						<Typography variant="h6" component="h3">
							Default Properties
						</Typography>
						{partner.defaultProperties.length ? (
							partner.defaultProperties.map(property => {
								return (
									<Typography key={property.property_id} component="p">
										{' '}
										{property.property_name}{' '}
									</Typography>
								);
							})
						) : (
							<Typography component="p">
								This partner currently has no default properties
							</Typography>
						)}
						<Button
							variant="contained"
							color="secondary"
							onClick={this.handleDefaultDialogOpen}
						>
							<Icon>add_circle</Icon>
						</Button>
						<Dialog
							open={this.state.defaultDialog}
							onClose={() => this.handleDefaultDialogClose()}
						>
							<DialogTitle>{`${
								partner.cleaner_name
							}'s Default Properties`}</DialogTitle>
							<List>
								{defaultPropertyList.map(property => (
									<ListItem
										button
										selected={
											partner.defaultProperties.find(
												({ property_id }) =>
													property_id === property.property_id
											)
												? true
												: false
										}
										onClick={() =>
											this.handleDefaultDialogClose(property.property_id)
										}
										key={property.property_id}
									>
										<ListItemText primary={property.property_name} />
									</ListItem>
								))}
							</List>
						</Dialog>

						<Typography variant="h6" component="h3">
							Available Properties
						</Typography>
						{partner.availableProperties.length ? (
							partner.availableProperties.map(property => {
								return (
									<Typography key={property.property_id} component="p">
										{' '}
										{property.property_name}{' '}
									</Typography>
								);
							})
						) : (
							<Typography component="p">
								This partner currently has no available properties
							</Typography>
						)}
						<Button
							variant="contained"
							color="secondary"
							onClick={this.handleAvailableDialogOpen}
						>
							<Icon>add_circle</Icon>
						</Button>
						<Dialog
							open={this.state.availableDialog}
							onClose={() => this.handleAvailableDialogClose()}
						>
							<DialogTitle>{`${
								partner.cleaner_name
							}'s Available Properties`}</DialogTitle>
							<List>
								{availablePropertyList.length > 0 ? (
									<>
										{availablePropertyList.map(property => (
											<ListItem
												button
												selected={
													partner.availableProperties.find(
														({ property_id }) =>
															property_id === property.property_id
													)
														? true
														: false
												}
												onClick={() =>
													this.handleAvailableDialogClose(property)
												}
												key={property.property_id}
											>
												<ListItemText primary={property.property_name} />
											</ListItem>
										))}
									</>
								) : null}
							</List>
						</Dialog>
					</Paper>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		properties: state.propertyReducer.properties,
		partners: state.propertyReducer.partners,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			changeCleaner,
			changeAvailableCleaner,
		}
	)(withStyles(styles)(PartnerCard))
);
