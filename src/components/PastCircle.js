// React
import React from 'react';

// Router
import { Link } from 'react-router-dom';

// Moment.js
import moment from 'moment';

//Circular Progress Bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

// Styled Components
import styled from 'styled-components';

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
		width: '33%',
	},
	propertyName: {
		fontWeight: 500,
		margin: '0 0 -5px',
	},
	dates: {
		fontWeight: 500,
		[theme.breakpoints.down(600)]: {
			fontSize: '.9rem',
		},
	},
	cleanerName: {
		margin: '-7px 0 18px',
	},
	blank: { fontSize: '3rem', color: '#b3b3b3' },
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
			<GuestLink to={`/guests/${guest.guest_id}`}>
				<div className={classes.progressBarReports}>
					<CircularProgressbar
						value={parseInt(guest.completion)}
						text={`${guest.completion}%`}
						styles={buildStyles({
							pathColor: color,
							textColor: color,
						})}
					/>
				</div>

				<Dates>
					<Typography
						variant="subtitle1"
						className={classes.dates}
						align="center"
						style={{ color }}
					>
						{`${moment(guest.checkin).format('MMM DD')} - ${moment(
							guest.checkout
						).format('MMM DD')}`}
					</Typography>
				</Dates>
			</GuestLink>

			{/* todo: make this a link to the partner page */}
			<Typography
				variant="subtitle2"
				className={classes.cleanerName}
				align="center"
			>
				{guest.manager_name || guest.cleaner_name || 'unassigned'}
			</Typography>
		</div>
	);
};

export default PastCircle;

const GuestLink = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 180px;
	color: inherit;
	text-decoration: none;
`;

const Dates = styled.div`
	display: flex;
	flex-direction: column;
`;
