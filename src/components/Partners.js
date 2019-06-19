// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
// Axios
import axios from 'axios';
//Material-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core';

//Actions
import { getPartners, getDefaultProperties } from '../actions';

//Component
import PartnerCard from './PartnerCard';

const styles = {
	card: {
		maxWidth: 600,
		margin: '20px auto 20px 0',
	},
	invite: {
		maxWidth: 600,
		margin: '20px auto 20px 0',
	},
	img: {
		width: 40,
	},
	content: {
		display: 'flex',
	},
	contentTypography: {
		margin: 'auto',
	},
};

class Partners extends React.Component {
	componentDidMount() {
		if (!localStorage.getItem('jwt')) {
			this.props.history.replace('/');
		}

		this.props.getPartners();
		this.props.getDefaultProperties();
	}

	componentDidUpdate(prevProps) {
		if (this.props.refreshProperties !== prevProps.refreshProperties) {
			this.props.getDefaultProperties();
		}

		if (this.props.refreshCleaners !== prevProps.refreshCleaners) {
			this.props.getPartners();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			partners: this.props.partners,
			email: '',
		};
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	sendEmail = async e => {
		if (!this.state.email) return;
		e.preventDefault();
		console.log('sending email');

		let token = localStorage.getItem('jwt');
		let userInfo = localStorage.getItem('userInfo');

		let options = {
			headers: {
				Authorization: `Bearer ${token}`,
				'user-info': userInfo,
			},
		};

		let body = {
			cleaner_email: this.state.email,
		};

		const backendUrl =
			process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
		try {
			const res = await axios.post(`${backendUrl}/api/invites/`, body, options);
			console.log(res);
		} catch (err) {
			console.log(err);
		}

		this.setState({ email: '' });
	};

	render() {
		const { classes, user, partners, defaultProperties } = this.props;

		return (
			user.role === 'manager' && (
				<div>
					<Typography variant="h2">Partners</Typography>

					<div className={classes.invite}>
						<Typography variant="h5">
							Send an invite to add a new partner!
						</Typography>
						<TextField
							value={this.state.email}
							onChange={this.handleInputChange}
							placeholder="Partner's Email"
							type="text"
							name="email"
						/>
						<Button type="submit" onClick={this.sendEmail}>
							Send Invite
						</Button>
					</div>

					{partners && defaultProperties ? (
						partners.map(partner => {
							return (
								<PartnerCard
									key={partner.cleaner_id}
									partner={partner}
									defaultProperties={defaultProperties}
								/>
							);
						})
					) : (
						<Typography variant="overline">
							No partners have been invited yet.
						</Typography>
					)}
				</div>
			)
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		user: state.authReducer.user || {},

		partners: state.propertyReducer.partners,
		defaultProperties: state.propertyReducer.defaultProperties,

		refreshCleaners: state.propertyReducer.refreshCleaners,
		refreshProperties: state.propertyReducer.refreshProperties,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			getPartners,
			getDefaultProperties,
		}
	)(withStyles(styles)(Partners))
);
