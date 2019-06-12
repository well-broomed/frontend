// React
import React from 'react';

// Moment.js
import moment from 'moment';

//Circular Progress Bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Styled Components
import styled from 'styled-components';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import RemoveIconRounded from '@material-ui/icons/RemoveRounded';

const useStyles = makeStyles(theme => ({
	progressBarReports: {
		display: 'flex',
		width: '75%'
	},
	singleProgress: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '33%'
	},
	deadline: {
		margin: '6px 0 0'
	},
	cleanerName: {
		margin: '-4px 0 14px'
	},
	blank: { fontSize: '3rem', color: '#b3b3b3' }
}));

const ProgressCircle = props => {
	const { guest, recent, current, upcoming, occupied } = props;

	const classes = useStyles();

	if (guest) {
		let deadline = '0:00';
		let diff = 0;
		let color = '#3E98C7';
		let trailColor = '#D6D6D6';

		if (recent) {
			deadline = guest.checkout;

			diff = Math.floor(
				moment.duration(moment(deadline).diff(moment())).asHours()
			);

			if (guest.completion === '100') {
				color = '#3dc73d';
			} else if (occupied || diff < -24) {
				color = '#c73d3d';
			} else if (diff < -20) {
				color = '#ec8218';
			} else if (diff < -12) {
				color = '#ecb718';
			}
		}

		if (current) {
			deadline = guest.checkout;

			diff = Math.floor(
				moment.duration(moment(deadline).diff(moment())).asHours()
			);

			if (guest.completion === '100') {
				color = '#3dc73d';
			} else if (diff < 1) {
				color = '#ec8218';
			} else if (diff < 2) {
				color = '#ecb718';
			}
		}

		if (upcoming) {
			deadline = guest.checkin;

			diff = Math.floor(
				moment.duration(moment(deadline).diff(moment())).asHours()
			);

			if (guest.completion === '100') {
				color = '#3dc73d';
			} else if (occupied || diff > 12) {
				color = '#B3B3B3';
			} else if (diff < 1) {
				color = '#ec8218';
			} else if (diff < 2) {
				color = '#ecb718';
			}
		}

		return (
			<div className={classes.singleProgress}>
				<div className={classes.progressBarReports}>
					<CircularProgressbar
						value={guest.completion}
						text={`${guest.completion}%`}
						styles={buildStyles({
							pathColor: color,
							textColor: color,
							trailColor
						})}
					/>
				</div>
				<Typography
					variant="subtitle1"
					className={classes.deadline}
					align="center"
					style={{ color }}
				>
					{moment(deadline).format('MM/DD h:mma')}
				</Typography>
				<Typography
					variant="subtitle2"
					className={classes.cleanerName}
					align="center"
				>
					{guest.cleaner_name || 'unassigned'}
				</Typography>
			</div>
		);
	} else {
		return (
			<div className={classes.singleProgress}>
				<Blank>
					<RemoveIconRounded className={classes.blank} />
				</Blank>
			</div>
		);
	}
};

export default ProgressCircle;

const Blank = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding: 0 0 64px;
`;
