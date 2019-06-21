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

import Auth from './Auth';
const auth = new Auth;

const FeatureGrid = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 10px;
    background: white;
    
    margin: 20px 0px;
`;

const Feature = styled.div`
    width: 50%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin: 20px 0px;

    .icon{
        width: auto;
        margin: 0px 10px;
        
        svg{
            font-size: 3rem;
        }
    }

    .text{
        width: 70%;
    }

    `;

const Intro = styled.div`
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    h3{
        margin: 20px 0px;
    }

    h5{
        margin: 20px 0px;
        width: 75%;
    }
    `;

const InfoList = styled.div`

    margin: 20px 0px;
    `;

const CallToAction = styled.div`
    margin: 20px 0px;
    text-align: center;

    button{
        font-size: 1.5rem;
        margin: 10px 0px;
    }

`;


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

    }

    handleLogin = () => {
        auth.login();
    }

    render(){
        return (
            <div>
                    <Intro>
                <Typography variant = 'h3'>Welcome to WellBroomed!</Typography>
                <Typography variant = 'h5'>WellBroomed helps managers of short-term rental properties keep track of the various cleaning tasks that need to be completed between guest check-ins.</Typography>
                </Intro>

                <Typography variant = 'h6'>With WellBroomed, you can:</Typography>

                <FeatureGrid>
                <Feature>
                    <div className = 'icon'><ListAltTwoTone/></div>
                    <div className = 'text'><Typography variant = 'body1'>Create and manage cleaning checklists for your short-term rental properties.</Typography></div>
                </Feature>



                <Feature>
                    <div className = 'icon'><PersonAddTwoTone/></div>
                    <div className = 'text'><Typography variant = 'body1'>Invite cleaning assistants and assign cleaning shifts.</Typography></div>
                </Feature>


                <Feature>
                    <div className = 'icon'><TimelapseTwoTone/></div>
                    <div className = 'text'><Typography variant = 'body1'>Check the turnover progress of all your properties from one place.</Typography></div>
                </Feature>

                <Feature>
                    <div className = 'icon'><NotificationsActiveTwoTone/></div>
                    <div className = 'text'><Typography variant = 'body1'>Automatically notify guests when their property is ready.</Typography></div>
                </Feature>
                </FeatureGrid>

                <InfoList>

                <Typography variant = 'h6'>How does it work?</Typography>
                
                    <ul>
                    <Typography variant = 'body1'>
                        <li>Each property has its own checklist template.</li>
                        <li>Within each template, you can assign tasks to be completed Before, During, and After the stay.</li>
                        <li>Every time you add a reservation, a cleaning shift is generated with tasks from the template.</li>
                        <li>You can choose which assistants you want to assign to each property, and notify them whenever there is an upcoming reservation.</li>
                    </Typography>
                    </ul>
                
                </InfoList>

                <CallToAction>

                <Typography variant = 'h5'>Ready to simplify your property management tasks?</Typography>
                <Button size = 'large' variant = 'contained' color = 'primary' onClick = {this.handleLogin}>Sign Me Up!</Button>
                </CallToAction>

                
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


