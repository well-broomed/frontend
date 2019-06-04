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
import { getPartners, getUserProperties } from '../actions';

//Component
import PartnerCard from './PartnerCard';

const styles = {
	card: {
		maxWidth: 600,
		margin: '20px auto'
	},
	invite: {
		maxWidth: 600,
		margin: '20px auto'
	},
	img: {
		width: 40
	},
	content: {
		display: 'flex'
	},
	contentTypography: {
		margin: 'auto'
	}
};

class Partners extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			partners: this.props.cleaners,
			email: ''
		};
	}

	componentDidUpdate(prevProps) {
		if(this.props.refreshProperties !== prevProps.refreshProperties){
			this.props.getUserProperties();
		}

		if (this.props.refreshCleaners !== prevProps.refreshCleaners) {
			this.props.getPartners();
		}
	}

	componentDidMount() {
		if(!this.props.properties){
			this.props.getUserProperties();
		}
		if(!this.props.cleaners){
			this.props.getPartners();
		}
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	sendEmail = async e => {
		if (!this.state.email) return;
		e.preventDefault();
		console.log('sending email');

		let token = localStorage.getItem('jwt');
		let userInfo = localStorage.getItem('userInfo');

		let options = {
			headers: {
				Authorization: `Bearer ${token}`,
				'user-info': userInfo
			}
		};

		let body = {
			cleaner_email: this.state.email
		};

		const backendUrl = process.env.backendURL || 'http://localhost:5000';
		try {
			const res = await axios.post(`${backendUrl}/api/invites/`, body, options);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Typography variant="h2">Partners</Typography>
				{this.props.cleaners ? (
					this.props.cleaners.map(partner => {
						return <PartnerCard partner={partner} key={partner.user_id} />;
					})
				) : (
					<Typography variant="overline">
						No partners have been invited yet.
					</Typography>
				)}
				<div className={classes.invite}>
					<Typography variant="h5">
						{' '}
						Send an invite to add more partners!{' '}
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
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		properties: state.propertyReducer.properties,
		cleaners: state.propertyReducer.partners,
		refreshCleaners: state.propertyReducer.refreshCleaners
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			getPartners,
			getUserProperties
		}
	)(withStyles(styles)(Partners))
);
