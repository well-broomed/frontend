// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
// PropTypes
import PropTypes from 'prop-types';

import Select from 'react-select';

// Actions
// import { getProperty, addTask, updateTask, removeTask } from '../actions';
import { getProperty } from '../actions';

// Styled Components
import styled from 'styled-components';

// Material-UI
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
});

// After-stay options
const options = [
	// { value: '1', label: '1 hour After Stay' },
	// { value: '2', label: '2 hours After Stay' },
	{ value: '3', label: '3 hours After Stay' },
	// { value: '4', label: '4 hours After Stay' },
	// { value: '5', label: '5 hours After Stay' },
	{ value: '6', label: '6 hours After Stay' },
	// { value: '7', label: '7 hours After Stay' },
	// { value: '8', label: '8 hours After Stay' },
	// { value: '9', label: '9 hours After Stay' },
	// { value: '10', label: '10 hours After Stay' },
	// { value: '11', label: '11 hours After Stay' },
	{ value: '12', label: '12 hours After Stay' },
	{ value: '24', label: '1 day After Stay' },
	{ value: '48', label: '2 days After Stay' },
	{ value: '72', label: '3 days After Stay' }
	// { value: '13', label: '13 hours After Stay' },
	// { value: '14', label: '14 hours After Stay' },
	// { value: '15', label: '15 hours After Stay' },
	// { value: '16', label: '16 hours After Stay' },
	// { value: '17', label: '17 hours After Stay' },
	// { value: '18', label: '18 hours After Stay' },
	// { value: '19', label: '19 hours After Stay' },
	// { value: '20', label: '20 hours After Stay' },
	// { value: '21', label: '21 hours After Stay' },
	// { value: '22', label: '22 hours After Stay' },
	// { value: '23', label: '23 hours After Stay' }
];

class Property extends React.Component {
	state = {};

	componentDidMount() {
		// This ought to wait til login response if not logged in
		this.props.getProperty(this.props.match.params.property_id);
	}

	render() {
		const { classes } = this.props;

		const tasks = this.props.property.tasks || [];

		const beforeStay = tasks[0] ? tasks.filter(task => task.deadline < 0) : [];
		const duringStay = tasks[0]
			? tasks.filter(task => task.deadline === 0)
			: [];

		const afterStay = [];

		if (tasks[0]) {
			for (let i = 0; i < tasks.length; i++) {
				if (tasks[i].deadline > 0) {
					if (afterStay[tasks[i].deadline])
						afterStay[tasks[i].deadline].push(tasks[i]);
					else afterStay[tasks[i].deadline] = [tasks[i]];
				}
			}
		}

		console.log('afterStay:', afterStay);

		return (
			<PropertyContainer>
				<BeforeAndDuringColumn>
					<Typography variant="h6" className={classes.title}>
						Before Stay
					</Typography>
					<List className={classes.root}>
						{beforeStay.map(({ task_id, text }) => (
							<ListItemWrapper key={task_id}>
								<ListItem role={undefined} button>
									<ListItemText primary={text} />
									<SecondaryActionWrapper>
										<ListItemSecondaryAction>
											<IconButton aria-label="Delete">
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</SecondaryActionWrapper>
								</ListItem>
							</ListItemWrapper>
						))}
					</List>
					<Typography variant="h6" className={classes.title}>
						After Stay
					</Typography>
					<List className={classes.root}>
						{duringStay.map(({ task_id, text }) => (
							<ListItemWrapper key={task_id}>
								<ListItem role={undefined} button>
									<ListItemText primary={text} />
									<SecondaryActionWrapper>
										<ListItemSecondaryAction>
											<IconButton aria-label="Delete">
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</SecondaryActionWrapper>
								</ListItem>
							</ListItemWrapper>
						))}
					</List>
				</BeforeAndDuringColumn>

				<AfterColumn>
					<Typography variant="h6" className={classes.title}>
						After Stay
					</Typography>
					{afterStay.map(
						deadline =>
							deadline && (
								<React.Fragment key={deadline[0].deadline}>
									<AfterStaySelect className={classes.root} options={options} />
									<List className={classes.root}>
										{deadline.map(({ task_id, text }) => (
											<ListItemWrapper key={task_id}>
												<ListItem role={undefined} button>
													<ListItemText primary={text} />
													<SecondaryActionWrapper>
														<ListItemSecondaryAction>
															<IconButton aria-label="Delete">
																<DeleteIcon />
															</IconButton>
														</ListItemSecondaryAction>
													</SecondaryActionWrapper>
												</ListItem>
											</ListItemWrapper>
										))}
									</List>
								</React.Fragment>
							)
					)}
				</AfterColumn>
			</PropertyContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.authReducer.userInfo,

		property: state.propertyReducer.property,

		gettingProperty: state.propertyReducer.gettingProperty,
		getPropertyError: state.propertyReducer.getPropertyError
	};
};

Property.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			getProperty
			// addTask,
			// updateTask,
			// removeTask
		}
	)(withStyles(styles)(Property))
);

const PropertyContainer = styled.div`
	display: flex;
`;

const BeforeAndDuringColumn = styled.div`
	width: 50%;
`;

const AfterColumn = styled.div`
	width: 50%;
`;

const AfterStaySelect = styled(Select)``;

const ListItemWrapper = styled.div``;

const SecondaryActionWrapper = styled.div`
	display: none;

	${ListItemWrapper}:hover & {
		display: block;
	}
`;
