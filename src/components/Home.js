// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';

// Components

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Tabs, Tab, Paper} from '@material-ui/core';

// Icons
import ListAltTwoTone from '@material-ui/icons/ListAltTwoTone';
import PersonAddTwoTone from '@material-ui/icons/PersonAddTwoTone';
import TimelapseTwoTone from '@material-ui/icons/TimelapseTwoTone';
import NotificationsActiveTwoTone from '@material-ui/icons/NotificationsActiveTwoTone';
import FileCopyTwoTone from '@material-ui/icons/FileCopyTwoTone';

import Auth from './Auth';
const auth = new Auth();

const FeatureGrid = styled.div`
	display: flex;
	flex-flow: column nowrap;
	width: 100%;
	padding: 10px;
	background: white;

	margin: 20px 0px;

	@media (max-width: 800px) {
		flex-direction: column;
	}
`;

const Feature = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	margin: 20px 0px;
	background: white;
	padding: 20px 0px;
	border-radius: 10px;
	background: white;

	.icon {
		width: auto;
		margin: 0px 10px;

		svg {
			font-size: 5rem;
		}
	}

	.text {
		width: 70%;
	}

	@media (max-width: 800px) {
		width: 100%;
	}
`;

const Intro = styled.div`
	text-align: center;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	margin: 120px 0px 30px 0px;
`;

const InfoList = styled.div`
	margin: 20px 0px;
`;

const CallToAction = styled.div`
	margin: 30px 0px;
	text-align: center;

	button {
		font-size: 1.5rem;
		margin: 40px 0px 20px 0px;
	}
`;

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	handleLogin = () => {
		auth.login();
	};

	render() {
		return (
			<div>
				<Intro>
					<Typography variant="h2">Welcome to WellBroomed!</Typography>
					<Typography variant="h6">
						WellBroomed is a short-term rental property management application.
					</Typography>
				</Intro>

				<CallToAction>
					<Typography variant="h5">
						Ready to manage guest turnovers with ease?
					</Typography>
					<Button
						size="large"
						variant="contained"
						color="primary"
						onClick={this.handleLogin}
					>
						Let's do it!
					</Button>
				</CallToAction>

				<Typography align = 'center' variant = 'h5'>Need some convincing? With WellBroomed, you can:</Typography>

				<FeatureGrid>
					<Feature>
						<div className="icon">
							<ListAltTwoTone />
						</div>
						<div className="text">
							<Typography variant="h6">
								Create cleaning checklists for your short-term rental
								properties.
							</Typography>
						</div>
					</Feature>

					<Feature>
						<div className="icon">
							<PersonAddTwoTone />
						</div>
						<div className="text">
							<Typography variant="h6">
								Invite cleaning assistants and assign cleaning shifts.
							</Typography>
						</div>
					</Feature>

					<Feature>
						<div className="icon">
							<FileCopyTwoTone />
						</div>
						<div className="text">
							<Typography variant="h6">
								Generate cleaning checklists from a template automatically for each new guest.
							</Typography>
						</div>
					</Feature>

					<Feature>
						<div className="icon">
							<TimelapseTwoTone />
						</div>
						<div className="text">
							<Typography variant="h6">
								Monitor the checklist completion status of all your properties from one
								place.
							</Typography>
						</div>
					</Feature>

					<Feature>
						<div className="icon">
							<NotificationsActiveTwoTone />
						</div>
						<div className="text">
							<Typography variant="h6">
								Automatically notify assistants when a new guest is added.
							</Typography>
						</div>
					</Feature>
				</FeatureGrid>

				{/* <InfoList>
					<Typography variant="h6">How does it work?</Typography>

					<ul>
						<Typography variant="body1">
							<li>Each property has its own checklist template.</li>
							<li>
								Within each template, you can assign tasks to be completed
								Before, During, and After the stay.
							</li>
							<li>
								Every time you add a reservation, a cleaning shift is generated
								with tasks from the template.
							</li>
							<li>
								You can choose which assistants you want to assign to each
								property, and notify them whenever there is an upcoming
								reservation.
							</li>
						</Typography>
					</ul>
				</InfoList> */}

				<CallToAction>
					<Typography variant="h5">
						Pretty cool, right?
					</Typography>
					<Button
						size="large"
						variant="contained"
						color="primary"
						onClick={this.handleLogin}
					>
						That sounds awesome! Sign Me Up!
					</Button>
				</CallToAction>
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
	)(Home)
);
