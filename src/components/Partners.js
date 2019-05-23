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

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core';

//Actions
import { getPartners }  from '../actions';

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
			email: '',
			open: false
		};
	}
	
	componentDidMount() {
		this.props.getPartners();
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
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
				'user-info': userInfo
			}
		};

		let body = {
			cleaner_email: this.state.email
		};

		const backendUrl = process.env.backendURL || 'http://localhost:5000';
		try {
			const res = await axios.post(`${backendUrl}/api/invites/`, body, options);
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
						return (
							<PartnerCard partner={partner} key={partner.user_id}/>
						);
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
		cleaners: state.propertyReducer.partners,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			getPartners,
		}
	)(withStyles(styles)(Partners))
);
