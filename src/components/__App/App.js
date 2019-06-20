// Dependencies
import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { checkIfUserExists, setUser } from '../../actions/index';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Components
import {
	Home,
	Properties,
	Property,
	Partners,
	Guests,
	Guest,
	Reports,
	Account,
	Callback,
	Navigation,
	Redirect,
	Invite,
} from '../../components';

import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';

//Styles
const ComponentContainer = styled.div`
	width: 80%;
	margin: 0 auto;
	margin-top: 80px;
`;

class App extends Component {
	componentDidMount() {
		if(!this.props.userChecked){
			this.props.checkIfUserExists(
				localStorage.getItem('accountType') || localStorage.getItem('role')
			);
		}

		if (
			(localStorage.getItem('isLoggedIn') &&
				!localStorage.getItem('userInfo')) ||
			!localStorage.getItem('currentUser')
		) {
			this.props.checkIfUserExists(
				localStorage.getItem('accountType') || localStorage.getItem('role')
			);
		} else if (!this.props.user && localStorage.getItem('currentUser')) {
			this.props.setUser(JSON.parse(localStorage.getItem('currentUser')));
		}
	}

	render() {
		return (
			<div>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<CssBaseline />
					<Navigation />
					{/* Declare Routes */}
					<ComponentContainer>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/properties" component={Properties} />
							<Route path="/properties/:property_id" component={Property} />
							<Route exact path="/partners" component={Partners} />
							<Route exact path="/guests" component={Guests} />
							<Route path="/guests/:guest_id" component={Guest} />
							<Route exact path="/reports" component={Reports} />
							<Route exact path="/account" component={Account} />
							<Route path="/callback" component={Callback} />
							<Route path="/redirect" component={Redirect} />
							<Route path="/invite" component={Invite} />
						</Switch>
					</ComponentContainer>
				</MuiPickersUtilsProvider>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		userInfo: state.authReducer.user,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			checkIfUserExists,
			setUser,
		}
	)(App)
);
