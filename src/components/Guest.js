// React
import React, { useEffect } from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter, Link as RouterLink } from 'react-router-dom';

// Components
import { GuestList } from '../components';

// Actions
import { getGuest, updateGuestTask } from '../actions';

// Styled Components
import styled from 'styled-components';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
}));

const hourConverter = hours => {
	return `${
		hours % 24
			? hours + (hours > 1 ? ' hours' : ' hour')
			: hours / 24 + (hours > 24 ? 'days' : 'day')
	} After Stay`;
};

const Guest = props => {
	const classes = useStyles();

	useEffect(() => {
		props.getGuest(props.match.params.guest_id);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	// Empty array = componentDidMount functionality

	const tasks = props.guest.tasks || [];

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

	const checkHandler = (task_id, completed) => {
		props.updateGuestTask(props.guest.guest_id, task_id, completed);
	};

	return (
		<React.Fragment>
			<TopBar>
				<LeftStuff>
					<PropertyImg
						// Change this to a file!
						src={
							props.guest.img_url ||
							'https://images.freeimages.com/images/small-previews/7ea/house-1-1225482.jpg'
						}
						alt={props.guest.property_name || 'Property Image'}
					/>

					<TitleContainer>
						<Typography variant="h3">
							{props.guest.guest_name || null}
						</Typography>

						<Typography variant="h6">
							{props.gettingGuest ? (
								'Loading...'
							) : props.getGuestError ? (
								'Error'
							) : (
								<Link
									component={RouterLink}
									to={`/properties/${props.guest.property_id}`}
								>
									{props.guest.property_name}
								</Link>
							)}
						</Typography>
					</TitleContainer>
				</LeftStuff>

				<Typography variant="h1">
					{props.guest.tasks &&
						Math.floor(
							(props.guest.tasks.reduce(
								(sum, { completed }) => (completed ? sum + 1 : sum),
								0
							) /
								props.guest.tasks.length) *
								100
						) + '%'}
				</Typography>
			</TopBar>

			<GuestContainer>
				<BeforeAndDuringColumn>
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
				</BeforeAndDuringColumn>

				<AfterColumn>
					{afterStay.map(
						(list, deadline) =>
							list && (
								<GuestList
									classes={classes}
									listTitle={hourConverter(deadline)}
									taskList={list}
									checkHandler={checkHandler}
								/>
							)
					)}
				</AfterColumn>
			</GuestContainer>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		userInfo: state.authReducer.userInfo,

		guest: state.guestReducer.guest,

		gettingGuest: state.guestReducer.gettingGuest,
		getGuestError: state.guestReducer.getGuestError
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			getGuest,
			updateGuestTask
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

const BeforeAndDuringColumn = styled.div`
	width: 50%;
`;

const AfterColumn = styled.div`
	width: 50%;
`;
