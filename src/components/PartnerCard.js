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
	}
};

class PartnerCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			defaultproperties: [],
			availableproperties: [],
			updated: false
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
								<img className={classes.img} src={''} />
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
						<Typography variant="h6" className={classes.contentTypography}>
							Default Houses: {this.state.defaultproperties.length}
						</Typography>
						<Typography variant="h6" className={classes.contentTypography}>
							Available Houses: {this.state.availableproperties.length}
						</Typography>
					</CardContent>
				</Card>

				{this.state.open ? (
					<Paper className={classes.card}>
						<Typography variant="h6" component="h3">
							This is a sheet of paper.
						</Typography>
						<Typography component="p">
							Paper can be used to build surface or other elements for your
							application.
						</Typography>
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
