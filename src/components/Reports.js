// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
//SwipeableViews
import SwipeableViews from 'react-swipeable-views';
//Circular Progress Bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// Material-UI
import {
	Typography,
	Tabs,
	Tab,
	AppBar,
	withStyles,
	Paper,
	withTheme,
    Divider
} from '@material-ui/core';

const styles = {
	progressbar: {
		width: '50%',
		display: 'flex',
        margin: 'auto',
        height: '200px'
	},
	progressBarReports: {
		width: '75%',
		display: 'flex'
	},
	appbar: {
		marginTop: '15px'
    },
    divider: {
        margin: '15px 0'
    },
	reports: {
		marginTop: '20px'
	},
	progresses: {
		display: 'flex',
		flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '10px 0'
	},
	singleProgress: {
		width: '33%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
};

class Reports extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabValue: 0
		};
	}

	handleTabChange = (event, newValue) => {
		this.setState({ tabValue: newValue });
	};

	render() {
		const { classes } = this.props;
		const dummyProperties = [
			{
				property_name: 'Sears Tower',
				property_tasks: 50
			},
			{
				property_name: 'Hogwarts',
				property_tasks: 33
			},
			{
				property_name: 'Boardwalk',
				property_tasks: 49
			},
			{
				property_name: 'Notre Dame',
				property_tasks: 91
			}
		];

		const dummyPartners = [
			{
				partner_name: 'Fuzzy Dunlop',
				partner_tasks: 25
			},
			{
				partner_name: 'Carlos Slim',
				partner_tasks: 91
			},
			{
				partner_name: 'Bill Gates',
				partner_tasks: 63
			},
			{
				partner_name: 'Marlo Stanfield',
				partner_tasks: 17
			}
		];

		return (
			<div>
				<Typography variant="h2">Reports</Typography>
				<AppBar position="static" color="default" className={classes.appbar}>
					<Tabs
						value={this.state.tabValue}
						onChange={this.handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="Upcoming" />
						<Tab label="Past" />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={this.props.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.tabValue}
					onChangeIndex={this.handleChangeIndex}
					className={classes.reports}
				>
					<Typography component="div" dir={this.props.theme.direction}>
                    <Typography variant="h4" align="center">
							{' '}
							Overall Completion{' '}
						</Typography>
						<div className={classes.progressbar}>
							<CircularProgressbar value={33} text={33 + '%'} />
						</div>
                        <Divider className={classes.divider}/>
						<Typography variant="h4" align="center"> Properties </Typography>
						<div className={classes.progresses}>
							{dummyProperties.map(property => {
								return (
									<div className={classes.singleProgress}>
										<div className={classes.progressBarReports}>
											<CircularProgressbar
												value={property.property_tasks}
												text={`${property.property_tasks}%`}
											/>
										</div>
										<Typography variant="h6" align="center">
											{' '}
											{property.property_name}{' '}
										</Typography>
									</div>
								);
							})}
						</div>
                        <Divider className={classes.divider}/>
						<Typography variant="h4" align="center"> Partners </Typography>
						<div className={classes.progresses}>
							{dummyPartners.map(partner => {
								return (
									<div className={classes.singleProgress}>
										<div className={classes.progressBarReports}>
											<CircularProgressbar
												value={partner.partner_tasks}
												text={`${partner.partner_tasks}%`}
											/>
										</div>
										<Typography variant="h6" align="center">
											{' '}
											{partner.partner_name}{' '}
										</Typography>
									</div>
								);
							})}
						</div>
					</Typography>
					<Typography dir={this.props.theme.direction}>
                    <Typography variant="h4" align="center">
							{' '}
							Overall Completion{' '}
						</Typography>
                    <div className={classes.progressbar}>
							<CircularProgressbar value={33} text={33 + '%'} />
						</div>
                    <Divider className={classes.divider}/>
                    <Typography variant="h5" align='center'> Properties </Typography>
						<div className={classes.progresses}>
							{dummyProperties.map(property => {
								return (
									<div className={classes.singleProgress}>
										<div className={classes.progressBarReports}>
											<CircularProgressbar
												value={property.property_tasks}
												text={`${property.property_tasks}%`}
											/>
										</div>
										<Typography variant="h6" align="center">
											{' '}
											{property.property_name}{' '}
										</Typography>
									</div>
								);
							})}
						</div>
                        <Divider className={classes.divider}/>
						<Typography variant="h5" align="center"> Partners </Typography>
						<div className={classes.progresses}>
							{dummyPartners.map(partner => {
								return (
									<div className={classes.singleProgress}>
										<div className={classes.progressBarReports}>
											<CircularProgressbar
												value={partner.partner_tasks}
												text={`${partner.partner_tasks}%`}
											/>
										</div>
										<Typography variant="h6" align="center">
											{' '}
											{partner.partner_name}{' '}
										</Typography>
									</div>
								);
							})}
						</div>
					</Typography>
				</SwipeableViews>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
		}
	)(withStyles(styles, { withTheme: true })(Reports))
);
