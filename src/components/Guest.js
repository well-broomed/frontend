// React
import React, { useEffect } from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';

// Actions
import { getGuest, updateGuestTask } from '../actions';

// Styled Components
import styled from 'styled-components';

// Material-UI
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Checkbox from '@material-ui/core/Checkbox';

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

	return (
		<React.Fragment>
			<TopBar>
				<Typography variant="h4">
					{props.gettingGuest
						? 'Loading...'
						: props.getGuestError
						? 'Error'
						: props.guest.guest_name}
				</Typography>
			</TopBar>
			<GuestContainer>
				<BeforeAndDuringColumn>
					<Typography variant="h6" className={classes.title}>
						Before Stay
					</Typography>
					<List className={classes.root}>
						{beforeStay.map(({ task_id, text, completed }) => (
							<ListItem
								role={undefined}
								key={task_id}
								dense
								button
								onClick={() => {
									props.updateGuestTask(
										props.guest.guest_id,
										task_id,
										!completed
									);
								}}
							>
								<ListItemIcon>
									<Checkbox
										edge="start"
										checked={completed}
										tabIndex={-1}
										disableRipple
									/>
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>

					<Typography variant="h6" className={classes.title}>
						During Stay
					</Typography>
					<List className={classes.root}>
						{duringStay.map(({ task_id, text, completed }) => (
							<ListItem
								role={undefined}
								key={task_id}
								dense
								button
								onClick={() => {
									props.updateGuestTask(
										props.guest.guest_id,
										task_id,
										!completed
									);
								}}
							>
								<ListItemIcon>
									<Checkbox
										edge="start"
										checked={completed}
										tabIndex={-1}
										disableRipple
									/>
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</BeforeAndDuringColumn>

				<AfterColumn>
					{afterStay.map(
						(list, deadline) =>
							list && (
								<React.Fragment key={deadline}>
									<Typography variant="h6" className={classes.title}>
										{hourConverter(deadline)}
									</Typography>
									<List className={classes.root}>
										{list.map(({ task_id, text, completed }) => (
											<ListItem
												role={undefined}
												key={task_id}
												dense
												button
												onClick={() => {
													props.updateGuestTask(
														props.guest.guest_id,
														task_id,
														!completed
													);
												}}
											>
												<ListItemIcon>
													<Checkbox
														edge="start"
														checked={completed}
														tabIndex={-1}
														disableRipple
													/>
												</ListItemIcon>
												<ListItemText primary={text} />
											</ListItem>
										))}
									</List>
								</React.Fragment>
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
	padding: 10px 0 20px;
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
