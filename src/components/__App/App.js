// Dependencies
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// Components
import {Home, Properties, Partners, Guests, Reports, Account, Callback, Navigation} from '../../components';


//Styles
const AppContainer = styled.div`
	display: flex;
	max-width: 1280px;
	height: 100vh;
	background: #c6def2;
	background-image: radial-gradient(
		circle,
		white,
		#97c3e7,
		#c6def2,
		white,
		white
	);
	margin: 0 auto;
`;

class App extends Component {
	render() {
		return (
			<AppContainer>
				<Navigation />
				{/* Declare Routes */}
				<Switch>
					<Route exact path = '/' component = {Home} />
					<Route exact path = '/properties' component = {Properties} />
					<Route exact path = '/partners' component = {Partners} />
					<Route exact path = '/guests' component = {Guests} />
					<Route exact path = '/reports' component = {Reports} />
					<Route exact path = '/account' component = {Account} />
					<Route path = '/callback' component = {Callback} />
				</Switch>
			</AppContainer>
		);
	}
}

export default App;
