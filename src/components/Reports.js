// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';

// Components
import { ProgressRow, PartnerCircle, PastCircle } from '../components';

// Actions
import { getReports, getPastReports } from '../actions';

//SwipeableViews
import SwipeableViews from 'react-swipeable-views';

//Circular Progress Bar
import { CircularProgressbar } from 'react-circular-progressbar';

// Styled Components
import styled from 'styled-components';

// Material-UI
import {
	Typography,
	Tabs,
	Tab,
	AppBar,
	withStyles,
	Divider
} from '@material-ui/core';

const styles = {
	overallHeader: {
		margin: '0 0 14px'
	},
	progressbar: {
		width: '50%',
		display: 'flex',
		margin: '0 auto 10px',
		height: '200px'
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

function getOverall(arr) {
	let count = 0;

	const sum = arr.reduce((sum, property) => {
		let propertySum = 0;

		if (property.current) {
			propertySum += parseInt(property.current.completion);

			count++;
		} else {
			for (const guest in property) {
				propertySum += parseInt(property[guest].completion);

				count++;
			}
		}

		return sum + propertySum;
	}, 0);

	return Math.floor(sum / count);
}

function makePartners(arr) {
	const cleaners = {};
	const partners = [];

	arr.forEach(property => {
		for (const guest in property) {
			const id = property[guest].cleaner_id;

			if (id) {
				if (!(id in cleaners)) {
					cleaners[id] = {
						name: property[guest].cleaner_name,
						sum: 0,
						count: 0
					};
				}
				cleaners[id].sum += parseInt(property[guest].completion);
				cleaners[id].count++;
			}
		}
	});

	for (const cleaner in cleaners) {
		partners.push({
			cleaner_id: cleaner,
			cleaner_name: cleaners[cleaner].name,
			completion: Math.floor(cleaners[cleaner].sum / cleaners[cleaner].count)
		});
	}

	return partners;
}

class Reports extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabValue: 0
		};
	}

	componentDidMount() {
		if (!localStorage.getItem('jwt')) {
			this.props.history.replace('/');
		} else {
			this.props.getReports();
			this.props.getPastReports();
		}
	}

	handleTabChange = (event, newValue) => {
		this.setState({ tabValue: newValue });
	};

	render() {
		const { classes, reports, pastReports } = this.props;

		const overall = reports.length && getOverall(reports);

		const partners = makePartners(reports);

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
						<Tab label="Current" />
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
						<Typography
							variant="h4"
							className={classes.overallHeader}
							align="center"
						>
							Overall Completion
						</Typography>
						<div className={classes.progressbar}>
							<CircularProgressbar value={overall} text={overall + '%'} />
						</div>
						<Divider className={classes.divider} />
						<TimeHeaders>
							{['Recent', 'Current', 'Upcoming'].map(title => (
								<Typography
									key={title}
									variant="h5"
									className={classes.singleProgress}
									align="center"
								>
									{title}
								</Typography>
							))}
						</TimeHeaders>
						<div className={classes.progresses}>
							{reports.map((property, index) => (
								<ProgressRow
									key={`property${index}`}
									property={property}
									even={index % 2}
								/>
							))}
						</div>
						<Divider className={classes.divider} />
						<Typography variant="h4" align="center">
							Partners
						</Typography>
						<div className={classes.progresses}>
							{partners.map(partner => (
								<PartnerCircle key={partner.cleaner_name} partner={partner} />
							))}
						</div>
					</Typography>

					<Typography component="div" dir={this.props.theme.direction}>
						<div className={classes.progresses}>
							{pastReports.map(guest => (
								<PastCircle key={guest.guest_id} guest={guest} />
							))}
						</div>
					</Typography>
				</SwipeableViews>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		reports: state.reportsReducer.reports,
		pastReports: state.reportsReducer.pastReports,

		gettingReports: state.reportsReducer.gettingReports,
		getReportsError: state.reportsReducer.getReportsError,

		gettingPastReports: state.reportsReducer.gettingPastReports,
		getPastReportsError: state.reportsReducer.getPastReportsError
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			getReports,
			getPastReports // Really want to move this to 'past' tab only, couldn't figure out how to trigger action on tab change
		}
	)(withStyles(styles, { withTheme: true })(Reports))
);

const TimeHeaders = styled.div`
	display: flex;
	color: #b3b3b3;
`;
