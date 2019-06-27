// React
import React from 'react';

// Router
import { Link } from 'react-router-dom';

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
		width: '75%',
	},
	singleProgress: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '33%',
	},
	dates: {
		fontWeight: 500,
		margin: '4px 0 0',
		[theme.breakpoints.down(600)]: {
			fontSize: '.9rem',
		},
	},
	deadline: {
		fontWeight: 500,
		fontSize: '.9rem',
		margin: '-7px 0 0',
		[theme.breakpoints.down(600)]: {
			fontSize: '.8rem',
			lineHeight: 1.1,
			margin: '-3px 0 3px',
		},
	},
	cleanerName: {
		margin: '-3px 0 14px',
	},
	blank: { fontSize: '3rem', color: '#b3b3b3' },
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
				<GuestLink to={`/guests/${guest.guest_id}`}>
					<div className={classes.progressBarReports}>
						<CircularProgressbar
							value={guest.completion}
							text={`${guest.completion}%`}
							styles={buildStyles({
								pathColor: color,
								textColor: color,
								trailColor,
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

						{(recent || current) && (
							<Typography
								variant="subtitle1"
								className={classes.deadline}
								align="center"
								style={{ color }}
							>
								{`${moment(guest.checkout).format('h:mma')} checkout`}
							</Typography>
						)}

						{upcoming && (
							<Typography
								variant="subtitle1"
								className={classes.deadline}
								align="center"
								style={{ color }}
							>
								{`${moment(guest.checkin).format('h:mma')} checkin`}
							</Typography>
						)}
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

const GuestLink = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 180px;
	text-decoration: none;
`;

const Dates = styled.div`
	display: flex;
	flex-direction: column;
`;

const Blank = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding: 0 0 64px;
`;
