// Dependencies
import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { checkIfUserExists, setUser } from '../../actions/index';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import {createMuiTheme} from '@material-ui/core';


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
	Footer,
} from '../../components';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

//Styles
const ComponentContainer = styled.div`
	width: 100%;
	max-width: 940px;
	padding: 0 20px;
	margin: 80px auto 0;
	min-height: 85vh;
`;

const theme = createMuiTheme({
	typography: {
		fontFamily: [
			"Noto Sans",
			"Fjalla One",
			"sans-serif",
			"Roboto",
			"Arial",
			"-apple-system"
		].join(','),
		h1: {
			fontFamily: 'Fjalla One'
		},
		h2: {
			fontFamily: 'Fjalla One'
		},
		h3: {
			fontFamily: 'Fjalla One'
		},
		h4: {
			fontFamily: 'Fjalla One'
		},
		h5: {
			fontFamily: 'Fjalla One'
		},
		h6: {
			fontFamily: 'Noto Sans'
		},
		body1: {
			fontFamily: 'Noto Sans'
		},
		body2: {
			fontFamily: 'Noto Sans'
		},
		subtitle1: {
			fontFamily: 'Noto Sans'
		},
		subtitle2: {
			fontFamily: 'Noto Sans'
		},
		button: {
			fontFamily: 'Noto Sans'
		}
	},
	palette: {
		background: {
			default: '#f5f5f3'
		}
	}
});

class App extends Component {
	componentDidMount() {
		if (!this.props.userChecked) {
			this.props.checkIfUserExists(
				localStorage.getItem('accountType') || localStorage.getItem('role')
			);
		}
	}

	render() {
		return (
			<div>
				<MuiThemeProvider theme = {theme}>
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
					<Footer />
				</MuiPickersUtilsProvider>
				</MuiThemeProvider>
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
