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
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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

import { resetApp } from '../actions';

import Auth from './Auth';
// import lock from './Lock';

import styled from 'styled-components';

const auth = new Auth();

const styles = {
	root: {
		flexGrow: 1,
		padding: 0,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	drawer: {},
	appBar: {},
	list: {
		width: 250,
		margin: '60px 0px',
	},
	loginBtn: {
		background: '#81e4e4',
		fontWeight: 800,
	},
	logoutBtn: {
		background: '#b71c1c',
		color: 'white',
	},
	loginModal: {
		background: '#3d3d3d',
	},
};

const AccountFeatures = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	padding: 20px;

	@media (max-width: 800px) {
		flex-flow: column nowrap;
		padding: 0px 20px;
	}

	button {
		font-size: 1.5rem;
		min-width: 70%;
		margin: 0 auto;
	}

	ul{
			width: 100%;
			padding: 0px 0px 0px 20px;
		}


	.left {
		width: 45%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		@media (max-width: 800px) {
			width: 100%;
			margin-bottom: 20px;
			padding-bottom: 30px;
			border-bottom: 2px solid slategray;
		}
	}

	.right {
		width: 45%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		@media (max-width: 800px) {
			width: 100%;
			margin-bottom: 20px;
		}
	}
`;

const NavLinks = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	text-transform: uppercase;
	
	.links{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		

		a{
		padding: 22px;
		text-align: center;
		color: #fafafa;
		text-decoration: none;

		:hover{
			background: #fafafa;
			color: #3f51b5;
			font-weight: 800;

		}
	}

	.buttons{


	}

	}

	
	`;

const Transition = React.forwardRef((props, ref) => (
	<Slide direction="up" {...props} ref={ref} />
));
class Navigation extends React.Component {
	componentDidMount() {
		// modify this to check central state's isloggedin once backend is deployed
		if (localStorage.getItem('jwt')) {
			this.setState({
				isLoggedIn: true,
			});
		}

		// monitor window size for nav render
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.handleResize);
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
			accountType: null,
			width: 0,
		};

		this.toggleDrawer = (side, open) => () => {
			this.setState({
				[side]: open,
			});
		};
	}

	handleResize = () => {
		this.setState({
			width: window.innerWidth
		})
	}

	toggleModal = event => {
		event.preventDefault();
		this.setState({
			loginModal: !this.state.loginModal,
		});
	};

	selectAccount = (event, role) => {
		event.preventDefault();

		this.setState(
			{
				accountType: role,
				loginModal: false,
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
		resetApp();

		window.location = `https://${
			process.env.REACT_APP_AUTH0_DOMAIN
		}/v2/logout?returnTo=${process.env.REACT_APP_FRONTEND_URL ||
			'http://localhost:3000'}`;
	};

	render() {
		const { classes } = this.props;

		const { user } = this.props;

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
					fullWidth={true}
					maxWidth={'xl'}
				>
					<DialogTitle align="center">
						<Typography variant="h4">What kind of user are you?</Typography>
					</DialogTitle>

					<DialogContent>
						<AccountFeatures>
							<div className="left">
								<Typography variant="h6" align="center">
									You want to:
								</Typography>
								<ul>
									<li>Manage cleaning checklists</li>
									<li>Assign cleaning shifts</li>
									<li>Monitor turnover status</li>
									<li>Make life a little easier</li>
								</ul>

								<Button
									variant="contained"
									color="primary"
									align="center"
									onClick={event => {
										this.selectAccount(event, 'manager');
									}}
								>
									<div>I am a Manager</div>
								</Button>
							</div>

							<div className="right">
								<Typography variant="h6">You want to:</Typography>

								<ul>
									<li>Pick up cleaning shifts</li>
									<li>Be a lean, mean, cleaning machine</li>
									<li>Rock out with your mop out</li>
									<li>Earn some extra dough</li>
								</ul>

								<Button
									variant="contained"
									color="primary"
									align="center"
									onClick={event => {
										this.selectAccount(event, 'assistant');
									}}
								>
									<div>I am an Assistant</div>
								</Button>
							</div>
						</AccountFeatures>
					</DialogContent>
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
							<ListItem
								button
								key="Properties"
								component={Link}
								to="/properties"
							>
								<ListItemIcon>
									<BusinessTwoTone />
								</ListItemIcon>
								<ListItemText primary="Properties" />
							</ListItem>

							{user.role === 'manager' && (
								<ListItem button key="Partners" component={Link} to="/partners">
									<ListItemIcon>
										<PeopleTwoTone />
									</ListItemIcon>
									<ListItemText primary="Partners" />
								</ListItem>
							)}

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
						<br />
						<div style={{ padding: '0px 10px' }}>
							<Typography variant="overline">
								Please login to access the menu.
							</Typography>
						</div>
					</>
				)}
			</div>
		);

		return (
			<div className={classes.root}>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						{/** If width < 800, show hamburger and slide menu */}
						{this.state.width < 800 ? (
							<>
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
						</>
						) : (null)}
							
						<NavLinks>
						<div className = 'links'>
						{/** If width > 800, show tab links in navbar */}
						{this.state.width > 800 ? (
							<>
							{/** Only show home link if not logged in */}
							
							<Link to = '/'>Home</Link>
							
							{localStorage.getItem('jwt') ? (
								<>
								<Link to = '/properties'>Properties</Link>
								<Link to = '/partners'>Partners</Link>
								<Link to = '/guests'>Guests</Link>
								<Link to = '/reports'>Reports</Link>
								<Link to = '/account'>Account</Link>
								</>
							) : (null)}
							
							</>
						) : (null)}
						</div>
						

						{/* CONDITIONALLY RENDER LOGIN/LOGOUT BASED ON JWT PRESENCE */}
						<div className = 'buttons'>
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
						</div>
						</NavLinks>
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
		user: state.authReducer.user || {},
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			resetApp,
		}
	)(withStyles(styles)(Navigation))
);
