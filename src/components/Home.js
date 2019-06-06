// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

import styled from 'styled-components';

// Components

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import ListAltTwoTone from '@material-ui/icons/ListAltTwoTone';
import PersonAddTwoTone from '@material-ui/icons/PersonAddTwoTone';
import TimelapseTwoTone from '@material-ui/icons/TimelapseTwoTone';
import NotificationsActiveTwoTone from '@material-ui/icons/NotificationsActiveTwoTone';

const Cta = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    `;

const FeatureGrid = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
`;

const Feature = styled.div`
    width: 50%;
    display: flex;
    flex-flow: row nowrap;

    .icon{
        width: auto;
        
        svg{
            font-size: 3rem;
        }
    }

    .text{
        width: 70%;
    }

    `;



class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

    }

    render(){
        return (
            <div>
                <Cta>
                <Typography variant = 'h2'>WellBroomed</Typography>
                <Typography>WellBroomed helps managers of short-term rental properties keep track of the various cleaning tasks that need to be completed between guest check-ins.</Typography>
                
                <Typography variant = 'h4'>With WellBroomed, you can:</Typography>

                <FeatureGrid>
                <Feature>
                    <div className = 'icon'><ListAltTwoTone/></div>
                    <div className = 'text'>Create and manage cleaning checklists for your short-term rental properties.</div>
                </Feature>



                <Feature>
                    <div className = 'icon'><PersonAddTwoTone/></div>
                    <div className = 'text'>Invite cleaning assistants and assign cleaning shifts.</div>
                </Feature>


                <Feature>
                    <div className = 'icon'><TimelapseTwoTone/></div>
                    <div className = 'text'>Check the turnover progress of all your properties from one place.</div>
                </Feature>

                <Feature>
                    <div className = 'icon'><NotificationsActiveTwoTone/></div>
                    <div className = 'text'>Automatically notify guests when their property is ready.</div>
                </Feature>
                </FeatureGrid>

                <Typography variant = 'h4'>Ready to simplify your property management tasks?</Typography>
                <Button variant = 'contained' color = 'primary'>Sign Me Up!</Button>

                </Cta>
                
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // state items
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    
})(Home))


