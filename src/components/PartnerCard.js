import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core';

const styles = {
	card: {
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

class PartnerCard extends React.component {
	constructor(props){
		super(props);
	}

	render(){
	const {classes} = this.props;
	return (
		<div>
			<Card key={this.props.partner.user_id} className={classes.card}>
				<CardHeader
					title={this.props.partner.user_name}
					subheader={this.props.partner.address}
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
					<Typography variant="h6" className={classes.contentTypography}>
						Default Houses: {this.props.partner.houses.length}
					</Typography>
					<Typography variant="h6" className={classes.contentTypography}>
						Available Houses: {this.props.partner.available_houses.length}
					</Typography>
				</CardContent>
			</Card>

			{this.state.open ? (
				<Paper className={classes.root}>
					<Typography variant="h6" component="h3">
						This is a sheet of paper.
					</Typography>
					<Typography component="p">
						Paper can be used to build surface or other elements for your
						application.
					</Typography>
				</Paper>
			) : null}
		</div>
	);
		}
};
