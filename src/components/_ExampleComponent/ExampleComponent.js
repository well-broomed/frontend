// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styles
import { ExampleStyle } from '../../styles';

class ExampleComponent extends Component {
	render() {
		return (
			<ExampleComponentContainer>
				<ExampleStyle>
					<StyledLink to="/">Let's begin.</StyledLink>
				</ExampleStyle>
			</ExampleComponentContainer>
		);
	}
}

export default ExampleComponent;

// Local styles
const ExampleComponentContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

const StyledLink = styled(Link)`
	font-size: 2rem;
	text-decoration: none;

	&:hover {
		color: blue;
	}
`;
