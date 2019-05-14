// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

import AddPropertyForm from './AddPropertyForm';

// Styled Components
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

import Typography from '@material-ui/core/Typography';

// Icons
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// Actions
import {getUserProperties} from '../actions';

const TopBar = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    `;


const styles = {
    card: {
        maxWidth: 600,
        margin: '20px auto',
    },
    media: {
        objectFit: 'cover'
    },
    addIcon: {
        fontSize: '5rem',
        cursor: 'pointer',
    },
}

function Transition(props){
    return <Slide direction = 'down' {...props} />;
}

class Properties extends React.Component {

    componentDidMount(){
        this.props.getUserProperties();
    }

    componentDidUpdate(){
        if(this.props.refreshProperties){
            this.props.getUserProperties();
        }
    }

    constructor(props){
        super(props);
        this.state = {
            anchorEl: null,
            addModal: false,
        };

    }

    handleMenuClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null,
        })
    }

    handleModalOpen = () => {
        this.setState({
            addModal: true,
        })
    }

    handleModalClose = () => {
        this.setState({
            addModal: false,
        })
    }



    render(){
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const {classes} = this.props;

        const dummyCleaners = [
            {
                user_id: 198,
                user_name: 'Jiffy Smith',
                email: 'jiffy@smith.com',
                role: 'cleaner',
                img_url: null,
                phone: '123-456-7890',
                address: '21 Jump St. Los Angeles, CA 90021'
            },
            {
                user_id: 211,
                user_name: 'Johnny Breeze',
                email: 'jbreezy@gmail.com',
                role: 'cleaner',
                img_url: null,
                phone: '123-456-7890',
                address: '21 Jump St. Los Angeles, CA 90021'

            }
        ]

        return (
            <div>
                <TopBar>
                <Typography variant = 'h2'>Properties</Typography> <Fab color = 'primary' className = {classes.addIcon} onClick = {this.handleModalOpen}><AddIcon/></Fab>
                </TopBar>

                <Dialog open={this.state.addModal} TransitionComponent={Transition} keepMounted onClose={this.handleModalClose}>
                <DialogContent>
                <AddPropertyForm close = {this.handleModalClose}></AddPropertyForm>
                </DialogContent>
                
                </Dialog>

                {this.props.properties ? this.props.properties.map(property => {
                    return (
    
                        <Card className = {classes.card} key = {property.id}>
                        <CardHeader title = {property.property_name} subheader = {property.address}>
                        </CardHeader>

                        <CardContent>
                            
                            <Menu id='long-menu' anchorEl={anchorEl} open={open} onClose={this.handleClose}>
            
                            {dummyCleaners.map(cleaner => (
                                <MenuItem key = {cleaner.user_id} selected={cleaner.user_name} onClick={this.handleClose}>
                                {cleaner.user_name}
                                </MenuItem>
                            ))}

                            </Menu>

                        </CardContent>
                        </Card>
                        
                    )
                })
            
            : (<Typography variant = 'overline'>No properties have been added yet.</Typography>)}


            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // state items
        properties: state.propertyReducer.properties,
        refreshProperties: state.propertyReducer.refreshProperties,
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    getUserProperties,
    
})(withStyles(styles)(Properties)));