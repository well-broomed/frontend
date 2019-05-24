import React from 'react';
//Redux
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Material-ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon'

import { withStyles } from '@material-ui/core';

const styles = {
	card: {
		maxWidth: 600,
		margin: '20px auto'
	},
	img: {
		width: 40
	},
	content: {
		display: 'flex'
	},
	contentTypography: {
		margin: 'auto'
	},
	paper: {
		maxWidth: 600,
		margin: '20px auto',
		padding: '5px',
		'flex-direction': 'column',
    	'align-items': 'center',
    	display: 'flex',
	}
};

class PartnerCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			defaultproperties: [],
			availableproperties: [],
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.properties !== this.props.properties) {
			const defaultproperties = this.props.properties.filter(
				property => property.cleaner_id === this.props.partner.user_id
			);

			const availableproperties = defaultproperties.filter(property =>
				property.available_cleaners.some(
					cleaner => cleaner['cleaner_id'] === this.props.partner.user_id
				)
			);
			this.setState({ defaultproperties, availableproperties });
		}
	}

	handlePartnerHouse = event => {
		this.setState({
			open: !this.state.open
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Card key={this.props.partner.user_id} className={classes.card}>
					<CardHeader
						title={this.props.partner.user_name}
						subheader={this.props.partner.address}
						avatar={
							<Avatar>
								<img className={classes.img} src={this.props.partner.img_url} />
							</Avatar>
						}
						action={
							<Button
								variant={this.state.open ? 'contained' : null}
								onClick={this.handlePartnerHouse}
							>
								House Availability
							</Button>
						}
					/>
					<CardContent className={classes.content}>
						<Typography component="p" className={classes.contentTypography}>
							Default Properties: {this.state.defaultproperties.length}
						</Typography>
						<Typography component="p" className={classes.contentTypography}>
							Available Properties: {this.state.availableproperties.length}
						</Typography>
					</CardContent>
				</Card>

				{this.state.open ? (
					<Paper className={classes.paper}>
						<Typography variant="h6" component="h3">
							Default Properties
						</Typography>
						{this.state.defaultproperties.length ? this.state.defaultproperties.map(property => {
							 return <Typography key={property.property_id} component="p"> {property.property_name} </Typography>	
						}) : <Typography component="p">This partner currently has no default properties</Typography>}
						<Button variant="contained" color="secondary">
							<Icon>add_circle</Icon>
						</Button>
						<Typography variant="h6" component="h3">
							Available Properties
						</Typography>
						{this.state.availableproperties.length ? this.state.availableproperties.map(property => {
							 return <Typography key={property.property_id} component="p"> {property.property_name} </Typography>	
						}) : <Typography component="p">This partner currently has no available properties</Typography>}
						<Button variant="contained" color="secondary">
							<Icon>add_circle</Icon>
						</Button>
					</Paper>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		properties: state.propertyReducer.properties
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
		}
	)(withStyles(styles)(PartnerCard))
);
