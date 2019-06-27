// React
import React, { useState, useEffect } from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
// PropTypes
import PropTypes from 'prop-types';

// Components
import { PropertyChecklist } from '../components';

import noImage from '../images/no-image.gif';

// Actions
import {
	getProperty,
	addTask,
	updateTask,
	updateDeadline,
	deleteTask,
} from '../actions';

// React-Select
import Select from 'react-select';

// Styled Components
import styled from 'styled-components';

// Material-UI
import { withStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
});

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	propertyName: {
		[theme.breakpoints.down(600)]: {
			fontSize: 38,
		},
	},
	newTask: {
		height: 250,
		flexGrow: 1,
	},
	container: {
		position: 'relative',
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing(1),
		left: 0,
		right: 0,
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
	divider: {
		height: theme.spacing(2),
	},
}));

const afterStayOptions = [
	{ value: '3', label: '3 hours After Stay' },
	{ value: '6', label: '6 hours After Stay' },
	{ value: '12', label: '12 hours After Stay' },
	{ value: '24', label: '1 day After Stay' },
	{ value: '48', label: '2 days After Stay' },
	{ value: '72', label: '3 days After Stay' },
];

const suggestedTasks = [
	{ label: 'Change the bath towels' },
	{ label: 'Clean the toilet' },
	{ label: 'Vacuum the bedroom' },
	{ label: 'Wipe the windows' },
	{ label: 'Tidy the furniture' },
];

function renderInputComponent(inputProps) {
	const { classes, inputRef = () => {}, ref, ...other } = inputProps;

	return (
		<TextField
			fullWidth
			InputProps={{
				inputRef: node => {
					ref(node);
					inputRef(node);
				},
				classes: {
					input: classes.input,
				},
			}}
			{...other}
		/>
	);
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
	const matches = match(suggestion.label, query);
	const parts = parse(suggestion.label, matches);

	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map(part => (
					<span
						key={part.text + Math.floor(Math.random())} // fix this later
						style={{ fontWeight: part.highlight ? 500 : 400 }}
					>
						{part.text}
					</span>
				))}
			</div>
		</MenuItem>
	);
}

function getSuggestions(value) {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;

	return inputLength === 0
		? []
		: suggestedTasks.filter(suggestion => {
				const keep =
					count < 5 &&
					suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

				if (keep) {
					count += 1;
				}

				return keep;
		  });
}

function getSuggestionValue(suggestion) {
	return suggestion.label;
}

const Property = props => {
	const classes = useStyles();

	const [addingTask, setAddingTask] = useState(null);
	const [updatingTask, setUpdatingTask] = useState(null);
	const [newDeadline, setNewDeadline] = React.useState(null);
	const [newTask, setNewTask] = useState('');
	const [stateSuggestions, setSuggestions] = React.useState([]);

	useEffect(() => {
		props.getProperty(props.match.params.property_id);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	// Empty array = componentDidMount functionality

	const handleSuggestionsFetchRequested = ({ value }) => {
		setSuggestions(getSuggestions(value));
	};

	const handleSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const handleChange = (event, { newValue }) => {
		setNewTask(newValue);
	};

	const autosuggestProps = {
		renderInputComponent,
		suggestions: stateSuggestions,
		onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
		onSuggestionsClearRequested: handleSuggestionsClearRequested,
		getSuggestionValue,
		renderSuggestion,
	};

	const handleSubmit = (event, newTask, deadline) => {
		event.preventDefault();

		props.addTask(props.property.property_id, newTask, deadline);

		setNewTask('');

		// at the moment, errors eat your input with no feedback
	};

	const handleUpdate = (event, task_id, text, deadline) => {
		event.preventDefault();

		props.updateTask(task_id, text, deadline);
	};

	const handleDeadline = (oldDeadline, newDeadline) => {
		props.updateDeadline(props.property.property_id, oldDeadline, newDeadline);
	};

	const handleDelete = (event, task_id) => {
		event.stopPropagation();

		props.deleteTask(task_id);
	};

	const tasks = props.property.tasks || [];

	const beforeStay = tasks[0] ? tasks.filter(task => task.deadline < 0) : [];
	const duringStay = tasks[0] ? tasks.filter(task => task.deadline === 0) : [];

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

	const ProperyListProps = {
		classes,
		suggestedTasks,
		addingTask,
		setAddingTask,
		handleSubmit,
		updatingTask,
		setUpdatingTask,
		handleUpdate,
		handleDeadline,
		handleDelete,
	};

	const manager = props.user.role === 'manager';

	return (
		<React.Fragment>
			<TopBar>
				<PropertyImg
					// Change this to a file!
					src={
						props.property.img_url ||
						noImage
					}
					alt={props.property.property_name || 'Property Image'}
				/>

				<TitleContainer>
					<Typography variant="h3" className={classes.propertyName}>
						{props.property.property_name || null}
					</Typography>

					<Typography variant="h6">
						{props.gettingProperty && !props.property.address
							? 'Loading...'
							: props.getPropertyError
							? 'Error'
							: props.property.address}
					</Typography>
				</TitleContainer>
			</TopBar>
			<PropertyContainer>
				<BeforeAndDuringColumn>
					<PropertyChecklist
						{...ProperyListProps}
						listTitle="Before Stay"
						deadline={-1}
						taskList={beforeStay}
						manager={manager}
					/>

					<PropertyChecklist
						{...ProperyListProps}
						listTitle="During Stay"
						deadline={0}
						taskList={duringStay}
						manager={manager}
					/>
				</BeforeAndDuringColumn>

				<AfterColumn>
					{!!afterStay.length &&
						(manager && (
							<Typography variant="h6" className={classes.title}>
								After Stay
							</Typography>
						))}

					{afterStay.map(
						(taskList, deadline) =>
							taskList && (
								<PropertyChecklist
									{...ProperyListProps}
									key={deadline}
									deadline={deadline}
									taskList={taskList}
									afterStayOptions={afterStayOptions}
									manager={manager}
								/>
							)
					)}

					{manager && (
						<React.Fragment>
							{' '}
							<Typography variant="h6" className={classes.title}>
								Add "After Stay" List
							</Typography>
							{/* TODO: Move this to PropertyChecklist */}
							<Select
								className={classes.root}
								value={newDeadline}
								options={afterStayOptions.filter(
									option => !afterStay[+option.value]
								)}
								onChange={option => {
									setNewDeadline(option);
									setNewTask('');
								}}
							/>
							{newDeadline && (
								<NewTaskForm
									className={classes.root}
									onSubmit={event => {
										handleSubmit(event, newTask, newDeadline.value);
										setAddingTask(parseInt(newDeadline.value));
										setNewDeadline(null);
									}}
								>
									{/* onChange is kinda choppy here compared to the other lists. Not sure why. */}
									<Autosuggest
										{...autosuggestProps}
										inputProps={{
											classes,
											placeholder: 'Add a task',
											value: newTask,
											onChange: handleChange,
											autoFocus: true,
											onBlur: () => newTask || setNewDeadline(null),
											onKeyDown: e => {
												if (e.key === 'Escape') setNewDeadline(null);
											},
										}}
										theme={{
											container: classes.container,
											suggestionsContainerOpen:
												classes.suggestionsContainerOpen,
											suggestionsList: classes.suggestionsList,
											suggestion: classes.suggestion,
										}}
										renderSuggestionsContainer={options => (
											<Paper {...options.containerProps} square>
												{options.children}
											</Paper>
										)}
									/>
								</NewTaskForm>
							)}
						</React.Fragment>
					)}
				</AfterColumn>
			</PropertyContainer>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		user: state.authReducer.user || {},

		property: state.propertyReducer.property,

		gettingProperty: state.propertyReducer.gettingProperty,
		getPropertyError: state.propertyReducer.getPropertyError,
	};
};

Property.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			getProperty,
			addTask,
			updateTask,
			updateDeadline,
			deleteTask,
		}
	)(withStyles(styles)(Property))
);

const TopBar = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-end;
	padding: 10px 0 20px;
`;

const PropertyImg = styled.img`
	width: 160px;
	height: 160px;
	object-fit: contain;
`;

const TitleContainer = styled.div`
	display: flex;
	height: 160px;
	flex-direction: column;
	justify-content: flex-start;
	margin: 0 0 0 16px;
`;

const PropertyContainer = styled.div`
	display: flex;

	@media (max-width: 820px) {
		flex-direction: column;
	}
`;

const BeforeAndDuringColumn = styled.div`
	width: 50%;

	@media (max-width: 820px) {
		width: 100%;
	}
`;

const AfterColumn = styled.div`
	width: 50%;

	@media (max-width: 820px) {
		width: 100%;
	}
`;

const NewTaskForm = styled.form`
	padding: 16px 70px 14px 16px;
	margin: 0 0 8px;
`;
