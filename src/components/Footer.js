import React from 'react';

import styled from 'styled-components';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';


const FooterContainer = styled.div`
	width: 100%;
    text-align: center;
    bottom: 0;
    color: lightslategray;
    padding: 10px 0px;
    font-size: 10px;
    opacity: 0.5;
`;

const currentYear = moment().format('Y');

const Footer = (props) => {
    return (
        <FooterContainer>
        <Typography variant = 'overline'>
					{'\u00A9'} WellBroomed {currentYear}
		</Typography>
        </FooterContainer>
    )
}

export default Footer;