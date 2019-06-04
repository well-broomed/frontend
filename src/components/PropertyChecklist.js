// React
import React, { useState } from 'react';

// React-Select
import Select from 'react-select';

// React-Autosuggest
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

// Styled Components
import styled from 'styled-components';

// Material-UI
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
					input: classes.input
				}
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

function getSuggestionValue(suggestion) {
	return suggestion.label;
}

const PropertyChecklist = props => {
	const {
		classes,
		listTitle,
		taskList,
		deadline,
		suggestedTasks,
		addingTask,
		setAddingTask,
		handleSubmit,
		handleDelete,
		afterStayOptions
	} = props;

	const [newTask, setNewTask] = useState('');
	// const [addingTask, setAddingTask] = useState(false);
	const [stateSuggestions, setSuggestions] = React.useState([]);

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
		renderSuggestion
	};

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

	function hourConverter(hours) {
		return `${
			hours % 24
				? hours + (hours > 1 ? ' hours' : ' hour')
				: hours / 24 + (hours > 24 ? 'days' : 'day')
		} After Stay`;
	}

	return (
		<React.Fragment>
			{deadline > 0 ? (
				<Select
					className={classes.root}
					value={{
						value: deadline,
						label: hourConverter(deadline)
					}}
					options={afterStayOptions}
				/>
			) : (
				<Typography variant="h6" className={classes.title}>
					{listTitle}
				</Typography>
			)}
			<List className={classes.root}>
				{taskList.map(({ task_id, text }) => (
					<ListItemWrapper key={task_id}>
						<ListItem role={undefined} button>
							<ListItemText primary={text} />
							<SecondaryActionWrapper>
								<ListItemSecondaryAction onClick={() => handleDelete(task_id)}>
									<IconButton aria-label="Delete">
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</SecondaryActionWrapper>
						</ListItem>
					</ListItemWrapper>
				))}
			</List>
			{addingTask === deadline ? (
				<NewTaskForm
					className={classes.root}
					onSubmit={event => {
						event.preventDefault();

						if (newTask.replace(/\s/g, '').length) {
							handleSubmit(event, newTask, deadline);
							setNewTask('');
						}
					}}
				>
					<Autosuggest
						{...autosuggestProps}
						inputProps={{
							classes,
							placeholder: 'Add a task',
							value: newTask,
							onChange: handleChange,
							autoFocus: true,
							onBlur: () => newTask || setAddingTask(false),
							onKeyDown: e => {
								if (e.key === 'Escape') setAddingTask(false);
							}
						}}
						theme={{
							container: classes.container,
							suggestionsContainerOpen: classes.suggestionsContainerOpen,
							suggestionsList: classes.suggestionsList,
							suggestion: classes.suggestion
						}}
						renderSuggestionsContainer={options => (
							<Paper {...options.containerProps} square>
								{options.children}
							</Paper>
						)}
					/>
				</NewTaskForm>
			) : (
				<IconButton
					aria-label="AddCircle"
					onClick={() => {
						setAddingTask(deadline);
						setNewTask('');
					}}
				>
					<AddCircle className={classes.icon} style={{ fontSize: 30 }} />
				</IconButton>
			)}
		</React.Fragment>
	);
};

export default PropertyChecklist;

const ListItemWrapper = styled.div``;

const SecondaryActionWrapper = styled.div`
	display: none;

	${ListItemWrapper}:hover & {
		display: block;
	}
`;

const NewTaskForm = styled.form`
	padding: 0 70px 14px 16px;
	margin: 0 0 8px;
`;
