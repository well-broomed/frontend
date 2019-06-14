import React from 'react';

// Main Navbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Login Modal
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';

// Side Drawer
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';
import HomeTwoTone from '@material-ui/icons/HomeTwoTone';
import BusinessTwoTone from '@material-ui/icons/BusinessTwoTone';
import PeopleTwoTone from '@material-ui/icons/PeopleTwoTone';
import HotelTwoTone from '@material-ui/icons/HotelTwoTone';
import InsertChartTwoTone from '@material-ui/icons/InsertChartTwoTone';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './Auth';
// import lock from './Lock';

const auth = new Auth();

const styles = {
	root: {
		flexGrow: 1,
		padding: 0
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	drawer: {
	},
	appBar: {
	},
	list: {
		width: 250,
		margin: '60px 0px',
	},
	loginBtn: {
		background: '#1b5e20',
		color: 'white'
	},
	logoutBtn: {
		background: '#b71c1c',
		color: 'white'
	},
	loginModal: {
		background: '#3d3d3d'
	}
};

const Transition = React.forwardRef((props, ref) => (
	<Slide direction = 'up' {...props} ref = {ref} />
))
class Navigation extends React.Component {
	componentDidMount() {
		// modify this to check central state's isloggedin once backend is deployed
		if (localStorage.getItem('jwt')) {
			this.setState({
				isLoggedIn: true
			});
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			// nav state, to handle search inputs, modals, etc
			top: false,
			left: false,
			bottom: false,
			right: false,
			isLoggedIn: false,
			loginModal: false,
			accountType: null
		};

		this.toggleDrawer = (side, open) => () => {
			this.setState({
				[side]: open
			});
		};
	}

	toggleModal = event => {
		event.preventDefault();
		this.setState({
			loginModal: !this.state.loginModal
		});
	};

	selectAccount = (event, role) => {
		event.preventDefault();

		this.setState(
			{
				accountType: role,
				loginModal: false
			},
			this.handleLogin
		);
	};

	handleLogin = () => {
		/**
		 * Lock module will not work with database logins unless we pay for auth0 custom domain.
		 */

		// if(!this.state.accountType){
		//     window.alert('You must select an account type!')
		// } else {
		//     localStorage.setItem('accountType', this.state.accountType);
		//     lock.show();
		// }

		localStorage.setItem('accountType', this.state.accountType);

		auth.login();
	};

	handleLogout = event => {
		event.preventDefault();

		auth.logout();

		window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout`;
	};

	render() {
		const { classes } = this.props;

		// changes the listed path in the navbar depending on the current component being rendered
		let pathName = this.props.location.pathname.split('/');
		let pathRoute;

		if (pathName[1] !== '') {
			pathRoute = pathName[1].charAt(0).toUpperCase() + pathName[1].slice(1);
		} else {
			pathRoute = 'Home';
		}

		const loginModal = (
			<div className={classes.loginModal}>
				<Dialog
					open={this.state.loginModal}
					TransitionComponent={Transition}
					onClose={this.toggleModal}
				>
					<DialogTitle>Please select your account type.</DialogTitle>

					<DialogActions>
						<Button
							onClick={event => {
								this.selectAccount(event, 'manager');
							}}
						>
							<div>I am a Property Manager</div>
						</Button>

						<Button
							onClick={event => {
								this.selectAccount(event, 'assistant');
							}}
						>
							<div>I am an Assistant</div>
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);

		const sideMenu = (
			<div className={classes.list}>
				<List>
					<ListItem button key="Home" component={Link} to="/">
						<ListItemIcon>
							<HomeTwoTone />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>

					{localStorage.getItem('jwt') ? (
					
					<>
					<ListItem button key="Properties" component={Link} to="/properties">
						<ListItemIcon>
							<BusinessTwoTone />
						</ListItemIcon>
						<ListItemText primary="Properties" />
					</ListItem>

					<ListItem button key="Partners" component={Link} to="/partners">
						<ListItemIcon>
							<PeopleTwoTone />
						</ListItemIcon>
						<ListItemText primary="Partners" />
					</ListItem>

					<ListItem button key="Guests" component={Link} to="/guests">
						<ListItemIcon>
							<HotelTwoTone />
						</ListItemIcon>
						<ListItemText primary="Guests" />
					</ListItem>

					<ListItem button key="Reports" component={Link} to="/reports">
						<ListItemIcon>
							<InsertChartTwoTone />
						</ListItemIcon>
						<ListItemText primary="Reports" />
					</ListItem>
					</>
					) : null}

				</List>

				{localStorage.getItem('jwt') ? (
					<>
					<Divider />

					<List>
						<ListItem button key="Account" component={Link} to="/account">
							<ListItemIcon>
								<AccountCircleTwoTone />
							</ListItemIcon>
							<ListItemText primary="Account" />
						</ListItem>
					</List>			
					</>

				) : (
					<>
					<Divider />
					<br></br>
					<div style = {{padding: '0px 10px'}}>
					<Typography variant = 'subtitle1'>Please login to access the menu.</Typography>
					</div>
					</>
				)}
			</div>
		);

		return (
			<div className={classes.root}>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Menu"
							onClick={this.toggleDrawer('left', !this.state.left)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							{pathRoute}
						</Typography>

						{/* CONDITIONALLY RENDER LOGIN/LOGOUT BASED ON JWT PRESENCE */}
						{!localStorage.getItem('jwt') ? (
							<Button
								variant="contained"
								className={classes.loginBtn}
								onClick={this.toggleModal}
							>
								Login
							</Button>
						) : (
							<Button
								variant="contained"
								className={classes.logoutBtn}
								onClick={this.handleLogout}
							>
								Logout
							</Button>
						)}
					</Toolbar>
				</AppBar>

				{loginModal}

				<SwipeableDrawer
					className={classes.drawer}
					open={this.state.left}
					onClose={this.toggleDrawer('left', false)}
					onOpen={this.toggleDrawer('left', true)}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('left', false)}
						onKeyDown={this.toggleDrawer('left', false)}
					>
						{sideMenu}
					</div>
				</SwipeableDrawer>
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
	)(withStyles(styles)(Navigation))
);
