import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';

const PartnerCard = props => {
	const [count, setCount] = useState(0);

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
					<Typography variant="h6" className={classes.contentTypography}>
						Default Houses: {partner.houses.length}
					</Typography>
					<Typography variant="h6" className={classes.contentTypography}>
						Available Houses: {partner.available_houses.length}
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
			<p> You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
};
