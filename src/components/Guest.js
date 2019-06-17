// React
import React, { useEffect } from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter, Link as RouterLink } from 'react-router-dom';

// React-Select
import Select from 'react-select';

// Moment.js
import moment from 'moment';

// Components
import { GuestList } from '../components';

// Actions
import { getGuest, updateGuestTask, reassignCleaner } from '../actions';

// Styled Components
import styled from 'styled-components';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import DescriptionOutlined from '@material-ui/icons/DescriptionOutlined';

const useStyles = makeStyles(theme => ({
	checkList: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		margin: '0 0 12px',
	},
	guestInfo: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		maxWidth: 400,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2, 2),
		borderRadius: 0,
		boxShadow: 'none',
	},
	guide: { fontSize: '64px', padding: 0 },
	reassignmentText: { margin: '0 0 -2.5rem 0.9rem' },
	otherCleaner: { color: 'red' },
}));

const hourConverter = hours => {
	return `${
		hours % 24
			? hours + (hours > 1 ? ' hours' : ' hour')
			: hours / 24 + (hours > 24 ? 'days' : 'day')
	} After Stay`;
};

const Guest = props => {
	const {
		user,
		guest,
		match,
		getGuest,
		gettingGuest,
		getGuestError,
		updateGuestTask,
		reassignCleaner,
	} = props;

	const classes = useStyles();

	useEffect(() => {
		getGuest(match.params.guest_id);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	// Empty array = componentDidMount functionality

	const tasks = guest.tasks || [];

	const beforeStay = [];
	const duringStay = [];
	const afterStay = [];

	for (let i = 0; i < tasks.length; i++) {
		const deadline = tasks[i].deadline;

		if (deadline < 0) {
			beforeStay.push(tasks[i]);
		} else if (deadline === 0) {
			duringStay.push(tasks[i]);
		} else if (deadline > 0) {
			if (afterStay[deadline]) afterStay[deadline].push(tasks[i]);
			else afterStay[deadline] = [tasks[i]];
		}
	}

	const availableCleaners = guest.availableCleaners
		? guest.availableCleaners
				.map(({ cleaner_id, cleaner_name }) => ({
					value: cleaner_id,
					label: cleaner_name,
				}))
				.concat(
					guest.otherCleaners
						.filter(
							otherCleaner =>
								!(
									guest.availableCleaners.find(
										availableCleaner =>
											availableCleaner.cleaner_id === otherCleaner.cleaner_id
									) || otherCleaner.cleaner_id === guest.cleaner_id
								)
						)
						.map(({ cleaner_id, cleaner_name }) => ({
							value: cleaner_id,
							// Can't figure out a way to style individual options. Help!
							label: cleaner_name + '*',
						}))
				)
		: [];

	const checkHandler = (task_id, completed) => {
		updateGuestTask(guest.guest_id, task_id, completed);
	};

	const manager = user.role === 'manager';

	// Need to clear error when leaving page with useEffect() before implementing this
	// if (gettingGuest) return null;

	// if (getGuestError)
	// 	return (
	// 		<Typography variant="h5" style={{ padding: '30px 0 0' }}>
	// 			{getGuestError.response.status === 404
	// 				? '404 Guest not found'
	// 				: `${getGuestError.response.status} Error`}
	// 		</Typography>
	// 	);

	return (
		<React.Fragment>
			<TopBar>
				<LeftStuff>
					<PropertyImg
						// Change this to a file!
						src={
							guest.img_url ||
							'https://images.freeimages.com/images/small-previews/7ea/house-1-1225482.jpg'
						}
						alt={guest.property_name || 'Property Image'}
					/>

					<TitleContainer>
						<Typography variant="h3">{guest.guest_name || null}</Typography>

						<Typography variant="h6">
							{gettingGuest && !guest.property_name ? (
								'Loading...'
							) : getGuestError ? (
								'Error'
							) : (
								<Link
									component={RouterLink}
									to={`/properties/${guest.property_id}`}
								>
									{guest.property_name}
								</Link>
							)}
						</Typography>
					</TitleContainer>
				</LeftStuff>

				<Typography variant="h1">
					{guest.tasks &&
						Math.floor(
							(guest.tasks.reduce(
								(sum, { completed }) => (completed ? sum + 1 : sum),
								0
							) /
								guest.tasks.length) *
								100
						) + '%'}
				</Typography>
			</TopBar>

			<GuestContainer>
				<Checklists>
					<GuestList
						classes={classes}
						listTitle="Before Stay"
						taskList={beforeStay}
						checkHandler={checkHandler}
					/>

					<GuestList
						classes={classes}
						listTitle="During Stay"
						taskList={duringStay}
						checkHandler={checkHandler}
					/>

					{afterStay.map(
						(list, deadline) =>
							list && (
								<GuestList
									key={deadline}
									classes={classes}
									listTitle={hourConverter(deadline)}
									taskList={list}
									checkHandler={checkHandler}
								/>
							)
					)}
				</Checklists>

				<GuestInfo>
					<Paper className={classes.guestInfo}>
						<LeftColumn>
							<Dates>
								<DateColumn>
									<Typography component="p">Check-In</Typography>
									<Typography variant="h4">
										{guest.checkin
											? moment(guest.checkin).format('M/D')
											: '--/--'}
									</Typography>
								</DateColumn>

								<DateColumn>
									<Typography component="p">Check-Out</Typography>
									<Typography variant="h4">
										{guest.checkout
											? moment(guest.checkout).format('M/D')
											: '--/--'}
									</Typography>
								</DateColumn>
							</Dates>

							<Typography variant="body2" className={classes.reassignmentText}>
								{manager ? 'Assigned cleaner' : 'Request reassignment'}
							</Typography>

							{/* Ought to list reassignment requests here with an option to cancel them */}
							{/* Can't reassign if timeNow > after_checkout deadlines */}

							<CleanerSelect
								value={
									manager &&
									guest.cleaner_id && {
										value: guest.cleaner_id,
										label: guest.cleaner_name,
									}
								}
								options={
									manager
										? availableCleaners
										: availableCleaners.filter(
												({ value }) => value !== user.user_id
										  )
								}
								onChange={({ value }) => reassignCleaner(guest.guest_id, value)}
							/>
						</LeftColumn>

						<RightColumn>
							<GuestGuideIcon
								target="_blank"
								active={!!guest.guest_guide}
								href={guest.guest_guide}
							>
								<DescriptionOutlined className={classes.guide} />
							</GuestGuideIcon>
							<GuideLink
								target="_blank"
								active={!!guest.guest_guide}
								href={guest.guest_guide}
							>
								Guest Guide
							</GuideLink>

							<AssistantGuideIcon
								target="_blank"
								active={!!guest.assistant_guide}
								href={guest.assistant_guide}
							>
								<DescriptionOutlined className={classes.guide} />
							</AssistantGuideIcon>
							<GuideLink
								target="_blank"
								active={!!guest.assistant_guide}
								href={guest.assistant_guide}
							>
								Assistant Guide
							</GuideLink>
						</RightColumn>
					</Paper>
				</GuestInfo>
			</GuestContainer>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		user: state.authReducer.user || {},

		guest: state.guestReducer.guest,

		gettingGuest: state.guestReducer.gettingGuest,
		getGuestError: state.guestReducer.getGuestError,

		reassigningCleaner: state.guestReducer.reassigningCleaner,
		reassignCleanerError: state.guestReducer.reassignCleanerError,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			getGuest,
			updateGuestTask,
			reassignCleaner,
		}
	)(Guest)
);

const TopBar = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 10px 0 20px;
`;

const LeftStuff = styled.div`
	display: flex;
	align-items: flex-end;
`;

const PropertyImg = styled.img`
	width: 160px;
	height: 120px;
	background: lightgray;
	object-fit: cover;
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0 0 16px;
`;

const GuestContainer = styled.div`
	display: flex;
`;

const Checklists = styled.div`
	width: 50%;
`;

const GuestInfo = styled.div`
	width: 50%;
	/* padding: 32px 0 0; */
	padding: 2rem 0 0;
`;

const LeftColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-width: 60%;
	padding: 4px 0 0;
`;

const Dates = styled.div`
	display: flex;
`;

const DateColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
`;

const CleanerSelect = styled(Select)`
	margin: 0 0 0.7rem 0.7rem;
`;

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* margin-top: -4px; */
`;

const GuestGuideIcon = styled.a`
	color: ${props => (props.active ? '#3f51b5' : '#cccccc')};
	text-decoration: none;
`;

const AssistantGuideIcon = styled.a`
	color: ${props => (props.active ? '#3f51b5' : '#cccccc')};
	text-decoration: none;
	margin: 5px 0 0;
`;

const GuideLink = styled.a`
	color: ${props => (props.active ? '#3f51b5' : '#cccccc')};
	text-decoration: none;
	cursor: ${props => (props.active ? 'pointer' : 'default')};
	margin-top: -4px;
`;
