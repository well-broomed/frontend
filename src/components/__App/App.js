// Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

// Components
import { ExampleComponent } from '../../components';

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
				{/* <Navbar /> */}
				<Route exact path="/" component={ExampleComponent} />
			</AppContainer>
		);
	}
}

export default App;
