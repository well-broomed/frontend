// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
//SwipeableViews
import SwipeableViews from 'react-swipeable-views';
//Circular Progress Bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// Material-UI
import {
	Typography,
	Tabs,
	Tab,
	AppBar,
	withStyles,
    Paper,
    withTheme,
} from '@material-ui/core';

const styles = {
    progressbar: {
        width: '50%',
        display: 'flex',
        margin: 'auto'
    }
}

class Reports extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabValue: 0
		};
	}

	handleTabChange = (event, newValue) => {
		this.setState({ tabValue: newValue });
	};

    render()
        {
            const { classes } = this.props; 
		return (
			<div>
				<Typography variant="h2">Reports</Typography>
				<AppBar position="static" color="default">
					<Tabs
						value={this.state.tabValue}
						onChange={this.handleTabChange}
						indicatorColor="primary"
						textColor="primary"
                        centered
					>
						<Tab label="Upcoming" />
						<Tab label="Past" />
					</Tabs>
				</AppBar>
				<SwipeableViews
                    axis={this.props.theme.direction === 'rtl' ? 'x-reverse': 'x'}
                    index={this.state.tabValue}
                    onChangeIndex={this.handleChangeIndex}
                >
                <Typography component="div" dir={this.props.theme.direction}> 
                <div className={classes.progressbar}>
                <CircularProgressbar value={33} text={33 +'%'} strokeWidth={8}
                    styles={buildStyles({width: '50%' })}
                />
                </div>
                <Typography variant='h4' align='center'> Overall Completion </Typography>
                <Typography variant='h5'> Properties </Typography>
                <Typography variant='h5'> Partners </Typography>
                 </Typography>
                <Typography dir={this.props.theme.direction}> Past
                </Typography>
                </SwipeableViews>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
		}
	)(withStyles(styles, { withTheme: true })(Reports))
);
