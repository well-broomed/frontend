// React
import React from 'react';

// Router
import { Link } from 'react-router-dom';

// Components
import { ProgressCircle } from '../components';

// Styled Components
import styled from 'styled-components';

// Material-UI
import { Typography } from '@material-ui/core';

const ProgressRow = props => {
	const { property, even } = props;

	const propertyInfo = property.recent || property.current || property.upcoming;

	return (
		<PropertyRowContainer style={{ background: even ? 'inherit' : '#f2f2f2' }}>
			<PropertyLink to={`/properties/${propertyInfo.property_id}`}>
				<PropertyName
					variant="h4"
					// align="center"
				>
					{propertyInfo.property_name}
				</PropertyName>
			</PropertyLink>

			<PropertyRow>
				<ProgressCircle
					recent
					guest={property.recent}
					occupied={!!property.current}
				/>

				<ProgressCircle current guest={property.current} />

				<ProgressCircle
					upcoming
					guest={property.upcoming}
					occupied={!!property.current}
				/>
			</PropertyRow>
		</PropertyRowContainer>
	);
};

export default ProgressRow;

const PropertyRowContainer = styled.div`
	width: 100%;
	padding: 8px 0 0;
`;

const PropertyLink = styled(Link)`
	display: table;
	color: inherit;
	text-decoration: none;
	margin: 0 auto;
`;

const PropertyName = styled(Typography)`
	padding: 8px 20px;
	letter-spacing: 0.03rem;
`;

const PropertyRow = styled.div`
	display: flex;
	width: 100%;
	/* margin: 0 0 -20px; */
`;
