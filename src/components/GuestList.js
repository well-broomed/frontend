// React
import React from 'react';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Checkbox from '@material-ui/core/Checkbox';

const GuestList = props => {
	const { classes, listTitle, taskList, checkHandler } = props;

	return (
		<React.Fragment>
			<Typography variant="h6" className={classes.title}>
				{listTitle}
			</Typography>
			<List className={classes.root}>
				{taskList.map(({ task_id, text, completed }) => (
					<ListItem
						role={undefined}
						key={task_id}
						dense
						button
						onClick={() => checkHandler(task_id, !completed)}
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
	);
};

export default GuestList;
