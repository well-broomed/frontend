// React
import React from 'react';

// Components
import { ProgressCircle } from '../components';

// Styled Components
import styled from 'styled-components';

// Material-UI
import { Typography } from '@material-ui/core';

const ProgressRow = props => {
	const { property, even } = props;

	return (
		<PropertyRowContainer style={{ background: even ? 'inherit' : 'white' }}>
			<PropertyName variant="h6" align="center">
				{property.recent.property_name ||
					property.current.property_name ||
					property.upcoming.property_name}
			</PropertyName>

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
`;

const PropertyRow = styled.div`
	display: flex;
	width: 100%;
`;

const PropertyName = styled(Typography)`
	padding: 8px 0;
`;
