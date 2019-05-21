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
// import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core';

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

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	handlePartnerHouse = event => {
		this.setState({
			open: !this.state.open
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
		const dummydata = [
			{
				user_id: 1,
				user_name: 'Kevin Tena',
				role: 'partner',
				email: 'kevin@kevintena.com',
				phone: '123-234-0527',
				address: '123 W Cherry Ln',
				houses: [
					{
						house_id: 1,
						admin_id: 1,
						cleaner_id: 1,
						address: '500 N Lakeshore Dr'
					},
					{
						house_id: 2,
						admin_id: 1,
						cleaner_id: 1,
						address: '28 N Franklin Ave'
					}
				],
				available_houses: [
					{
						user_id: 1,
						house_id: 1
					}
				]
			},
			{
				user_id: 2,
				user_name: 'John Doe',
				role: 'partner',
				email: 'chuck@kevintena.com',
				phone: '123-456-7890',
				address: '300 W Monroe St',
				houses: [
					{
						house_id: 3,
						admin_id: 1,
						cleaner_id: 2,
						address: ' 234 N Michigan Ave'
					},
					{
						house_id: 4,
						admin_id: 1,
						cleaner_id: 2,
						address: '3000 N Lincoln Ave'
					}
				],
				available_houses: [
					{
						user_id: 2,
						house_id: 3
					},
					{
						user_id: 2,
						house_id: 4
					}
				]
			}
		];
		console.log(dummydata);
		return (
			<div>
				<Typography variant="h2">Partners</Typography>
				{dummydata ? (
					dummydata.map(partner => {
						return (
							<div>
								<Card key={partner.user_id} className={classes.card}>
									<CardHeader
										title={partner.user_name}
										subheader={partner.address}
										avatar={
											<Avatar>
												<img className={classes.img} src={''} />
											</Avatar>
										}
										action={
											<Button
												variant={this.state.open ? 'contained' : 'default'}
												onClick={this.handlePartnerHouse}
											>
												House Availability
											</Button>
										}
									/>

									<CardContent className={classes.content}>
										<Typography
											variant="h6"
											className={classes.contentTypography}
										>
											Default Houses: {partner.houses.length}
										</Typography>
										<Typography
											variant="h6"
											className={classes.contentTypography}
										>
											Available Houses: {partner.available_houses.length}
										</Typography>
									</CardContent>
								</Card>

								{/* {this.state.open ? <Paper className={classes.root}> //wIL
									<Typography variant="h6" component="h3">
										This is a sheet of paper.
									</Typography>
									<Typography component="p">
										Paper can be used to build surface or other elements for
										your application.
									</Typography>
								</Paper> : null} */}
							</div>
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
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
		}
	)(withStyles(styles)(Partners))
);
