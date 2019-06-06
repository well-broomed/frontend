// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter, Link} from 'react-router-dom';

import {deleteGuest} from '../actions/index';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import axios from 'axios';

import moment from 'moment';

import styled from 'styled-components';

import DeleteForeverTwoTone from '@material-ui/icons/DeleteForeverTwoTone';


const CardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    a{
        color: black;
        text-decoration: none;
        width: 80%;
    }
`;

const CardText = styled.div`


`;

const CardActions = styled.div`
    width: 20%;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-end;

    svg{
        cursor: pointer;
        font-size: 3rem;
    }
    `;

const token = localStorage.getItem('jwt');
const userInfo = localStorage.getItem('userInfo');

const options = {
	headers: { Authorization: `Bearer ${token}`, 'user-info': userInfo }
};

const backendUrl = 'http://localhost:5000' || process.env.REACT_APP_BACKEND_URL;

class GuestPreview extends React.Component {

    componentDidMount(){
        axios.get(`${backendUrl}/api/guests/${this.props.guest.guest_id}`, options).then(res => {
            this.setState({
                guest: res.data.guest
            })
        })
    }
    
    constructor(props){
        super(props);
        this.state = {
            guest: null,
            modalOpen: false,
        };

    }

    handleDelete = () => {
        this.props.deleteGuest(this.props.guest.guest_id);

        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    toggleModal = event => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }
    
    render(){
        // tab 0 = upcoming, 1 = incomplete, 2 = complete
        return (
            <div>
                <br></br>
                
                <Card>
                    <CardContent>
                    {this.state.guest ? (
                        <CardContainer>
                        <Link to = {`/guests/${this.props.guest.guest_id}`} >
                            <CardText>
                                <Typography variant = 'h4'>
                                {this.state.guest.guest_name}
                                </Typography>

                                <Typography variant = 'overline'>Check-In</Typography>
                                <Typography variant = 'h6'>{moment(this.state.guest.checkin).format('L')}</Typography>
                                <Typography variant = 'overline'>Check-Out</Typography>
                                <Typography variant = 'h6'>{moment(this.state.guest.checkout).format('L')}</Typography>
                        </CardText>
                        </Link>

                    <CardActions>
                    <DeleteForeverTwoTone onClick = {this.toggleModal}/>
                    </CardActions>
                    </CardContainer>

                    ) : null}
                    </CardContent>
                </Card>
                <br></br>


                <Dialog open = {this.state.modalOpen} onClose={this.toggleModal}>
                    <DialogContent>
                        <Typography variant = 'h6'>Are you sure you want to delete this?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleModal} variant = 'outlined' color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} variant = 'contained' color="secondary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // state items
        tasks: state.propertyReducer.tasks,
        guests: state.guestReducer.guests

    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    deleteGuest
    
})(GuestPreview))


