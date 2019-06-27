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

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

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
		updatingTask,
		setUpdatingTask,
		handleUpdate,
		handleDeadline,
		handleDelete,
		afterStayOptions,
		manager,
	} = props;

	const [newTask, setNewTask] = useState('');
	const [updatedTask, setUpdatedTask] = useState('');
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

	const handleUpdatedChange = (event, { newValue }) => {
		setUpdatedTask(newValue);
	};

	const autosuggestProps = {
		renderInputComponent,
		suggestions: stateSuggestions,
		onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
		onSuggestionsClearRequested: handleSuggestionsClearRequested,
		getSuggestionValue,
		renderSuggestion,
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
				: hours / 24 + (hours > 24 ? ' days' : ' day')
		} After Stay`;
	}

	if (!manager)
		return (
			<React.Fragment>
				{deadline > 0 ? (
					<Typography variant="h6" className={classes.title}>
						{hourConverter(deadline)}
					</Typography>
				) : (
					<Typography variant="h6" className={classes.title}>
						{listTitle}
					</Typography>
				)}
				<List className={classes.root} style={{ marginBottom: '16px' }}>
					{taskList.map(({ task_id, text }) => (
						<ListItem key={task_id}>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</React.Fragment>
		);

	return (
		<React.Fragment>
			{deadline > 0 ? (
				<Select
					className={classes.root}
					value={{
						value: deadline,
						label: hourConverter(deadline),
					}}
					onChange={({ value: newDeadline }) =>
						handleDeadline(deadline, newDeadline)
					}
					options={afterStayOptions}
				/>
			) : (
				<Typography variant="h6" className={classes.title}>
					{listTitle}
				</Typography>
			)}
			{taskList.length ? (
				<List className={classes.root}>
					{taskList.map(({ task_id, text }) => (
						<ListItemWrapper key={task_id}>
							{updatingTask === task_id ? (
								<UpdateTask>
									<UpdateTaskForm
										className={classes.root}
										onSubmit={event => {
											event.preventDefault();

											if (updatedTask.replace(/\s/g, '').length) {
												handleUpdate(task_id, updatedTask, deadline);

												setUpdatingTask(null);
											}

											setUpdatedTask('');
										}}
									>
										<Autosuggest
											{...autosuggestProps}
											inputProps={{
												classes,
												placeholder: 'Update task',
												value: updatedTask,
												onChange: handleUpdatedChange,
												autoFocus: true,
												onKeyDown: e => {
													if (e.key === 'Escape') setUpdatingTask(null);
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
									</UpdateTaskForm>

									<UpdateTaskIcon
										onClick={() => {
											if (updatedTask.replace(/\s/g, '').length) {
												handleUpdate(task_id, updatedTask, deadline);

												setUpdatingTask(null);
											}

											setUpdatedTask('');
										}}
									>
										<CheckIcon />
									</UpdateTaskIcon>

									<UpdateTaskIcon
										style={{
											paddingLeft: '0',
											margin: 'auto 5px auto -5px',
										}}
										onClick={() => setUpdatingTask(null)}
									>
										<ClearIcon />
									</UpdateTaskIcon>
								</UpdateTask>
							) : (
								<ListItem
									role={undefined}
									button
									onClick={() => {
										setUpdatedTask(text);
										setUpdatingTask(task_id);

										setAddingTask(null);
									}}
								>
									<ListItemText primary={text} />
									<EditIconWrapper>
										<EditIcon />
									</EditIconWrapper>
									<DeleteIconWrapper
										onClick={event => handleDelete(event, task_id)}
									>
										<DeleteIcon />
									</DeleteIconWrapper>
								</ListItem>
							)}
						</ListItemWrapper>
					))}
				</List>
			) : null}
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
					<AutosuggestContainer>
						<Autosuggest
							{...autosuggestProps}
							inputProps={{
								classes,
								placeholder: 'Add a task',
								value: newTask,
								onChange: handleChange,
								autoFocus: true,
								onKeyDown: e => {
									if (e.key === 'Escape') setAddingTask(false);
								},
							}}
							theme={{
								container: classes.container,
								suggestionsContainerOpen: classes.suggestionsContainerOpen,
								suggestionsList: classes.suggestionsList,
								suggestion: classes.suggestion,
							}}
							renderSuggestionsContainer={options => (
								<Paper {...options.containerProps} square>
									{options.children}
								</Paper>
							)}
						/>
					</AutosuggestContainer>
					<UpdateTaskIcon
						onClick={event => {
							event.preventDefault();

							if (newTask.replace(/\s/g, '').length) {
								handleSubmit(event, newTask, deadline);
								setNewTask('');
							}
						}}
					>
						<CheckIcon />
					</UpdateTaskIcon>

					<UpdateTaskIcon
						style={{
							paddingLeft: '0',
							margin: 'auto 5px auto -5px',
						}}
						onClick={() => setAddingTask(false)}
					>
						<ClearIcon />
					</UpdateTaskIcon>
				</NewTaskForm>
			) : (
				<NewTask
					onClick={() => {
						setUpdatingTask(null);

						setAddingTask(deadline);
						setNewTask('');
					}}
				>
					<Typography>Add a task</Typography>
					<AddIcon style={{ fontSize: '32px', margin: '-3px 0 0' }} />
				</NewTask>
			)}
		</React.Fragment>
	);
};

export default PropertyChecklist;

const ListItemWrapper = styled.div``;

const EditIconWrapper = styled.div`
	width: 22px;
	height: 22px;
	color: #757575;
	margin: 3px 12px 5px 0;

	/* ${ListItemWrapper}:hover & {
		color: inherit;
	} */

	&:hover {
		color: inherit;
	}
`;

const DeleteIconWrapper = styled.div`
	width: 24px;
	height: 24px;
	color: #757575;
	margin: 4px -2px 4px 0;

	&:hover {
		color: inherit;
	}
`;

const UpdateTaskIcon = styled.div`
	width: 40px;
	height: 40px;
	color: #757575;
	cursor: pointer;
	padding: 8px;
	margin: auto 8px auto 0;

	&:hover {
		color: inherit;
	}
`;

const UpdateTask = styled.div`
	display: flex;
`;

const UpdateTaskForm = styled.form`
	padding: 8px 0 8px 16px;
`;

const NewTask = styled.div`
	display: flex;
	justify-content: space-between;

	max-width: 408px;
	height: 46px;
	color: #757575;
	background: white;
	padding: 4px 12px 0 16px;
	margin: 0 0 16px;

	cursor: pointer;

	&:hover {
		color: inherit;
	}
`;

const NewTaskForm = styled.form`
	display: flex;

	padding: 0 0 8px 16px;
	margin: 0 0 14px;
`;

const AutosuggestContainer = styled.div`
	width: 100%;
`;
