// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

import {fetchAllGuests, getUserProperties, getCleaners} from '../actions/index';

import AddGuestForm from './AddGuestForm';

import styled from 'styled-components';

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

// Icons
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



const styles = {
        card: {
            minWidth: 275,
        },
        addIcon: {
            fontSize: '5rem',
            cursor: 'pointer'
        }
    }

const TopBar = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
`;



function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class Guests extends React.Component {

    componentDidMount(){
        if(!this.props.guests){
            this.props.fetchAllGuests();
        }
    }


    componentDidUpdate(prevProps) {

		if (prevProps.refreshProperties !== this.props.refreshProperties) {
			this.props.getUserProperties();
		}

		if(prevProps.refreshCleaners !== this.props.refreshCleaners){
			this.props.getCleaners();
		}
	}

    constructor(props){
        super(props);
        this.state = {
            addModal: false,
        };

    }

    handleModalOpen = () => {
		this.setState({
			addModal: true
		});
	};

	handleModalClose = () => {
		this.setState({
			addModal: false
		});
	};

    render(){
        const {classes} = this.props;
        return (
            <div>
                <TopBar>
					<Typography variant="h2">Guests</Typography>{' '}
					<Fab
						color="primary"
						className={classes.addIcon}
						onClick={this.handleModalOpen}
					>
						<AddIcon />
					</Fab>
				</TopBar>

                <Dialog
					open={this.state.addModal}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.handleModalClose}
				>
					<DialogContent>
						<AddGuestForm close={this.handleModalClose} />
					</DialogContent>
				</Dialog>




            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // state items
        guests: state.guestReducer.guests,
        refreshGuests: state.guestReducer.refreshGuests,
        refreshProperties: state.propertyReducer.refreshProperties,
        refreshCleaners: state.propertyReducer.refreshCleaners,
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    fetchAllGuests,
    getUserProperties,
    getCleaners,
}

)(withStyles(styles)(Guests)));
