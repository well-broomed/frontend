// React
import React from 'react';

//Circular Progress Bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	progressBarReports: {
		display: 'flex',
		width: '75%',
	},
	singleProgress: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		maxWidth: '180px',
		width: '33%',
		margin: '10px 0',
	},
	cleanerName: {
		margin: '6px 0 0',
	},
}));

const ProgressCircle = props => {
	const { partner } = props;

	const classes = useStyles();

	const color = partner.completion === 100 ? '#3DC73D' : '#3E98C7';

	return (
		<div className={classes.singleProgress}>
			<div className={classes.progressBarReports}>
				<CircularProgressbar
					value={partner.completion}
					text={`${partner.completion}%`}
					styles={buildStyles({
						pathColor: color,
						textColor: color,
					})}
				/>
			</div>

			<Typography variant="h6" className={classes.cleanerName} align="center">
				{partner.cleaner_name || 'unassigned'}
			</Typography>
		</div>
	);
};

export default ProgressCircle;
