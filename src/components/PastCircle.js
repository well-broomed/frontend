// React
import React from 'react';

// Moment.js
import moment from 'moment';

//Circular Progress Bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

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
	cleanerName: {
		margin: '-4px 0 14px'
	},
	blank: { fontSize: '3rem', color: '#b3b3b3' }
}));

const PastCircle = props => {
	const { guest } = props;

	const classes = useStyles();

	let color = '#3E98C7';

	switch (true) {
		case guest.completion === 100:
			color = '#3dc73d';
			break;

		case guest.completion < 70:
			color = '#c73d3d';
			break;

		case guest.completion < 90:
			color = '#ec8218';
			break;

		case guest.completion < 100:
			color = '#ecb718';
			break;

		default:
			break;
	}

	return (
		<div key={guest.guest_id} className={classes.singleProgress}>
			<div className={classes.progressBarReports}>
				<CircularProgressbar
					value={parseInt(guest.completion)}
					text={`${guest.completion}%`}
					styles={buildStyles({
						pathColor: color,
						textColor: color
					})}
				/>
			</div>
			<Typography
				variant="subtitle1"
				className={classes.deadline}
				align="center"
				style={{ color }}
			>
				{moment(guest.checkout).format('MM/DD h:mma')}
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
};

export default PastCircle;
