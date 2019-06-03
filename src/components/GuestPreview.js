// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter, Link} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import axios from 'axios';

import moment from 'moment';

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
        };
    }
    
    render(){
        // tab 0 = upcoming, 1 = incomplete, 2 = complete
        console.log(this.state.guest);
        return (
            <div>
                <br></br>
                <Link to = {`/guests/${this.props.guest.guest_id}`} >
                <Card>
                    <CardContent>
                    {this.state.guest ? (
                        <div>
                            <Typography variant = 'h4'>
                            {this.state.guest.guest_name}
                            </Typography>

                            <Typography variant = 'overline'>Check-In</Typography>
                            <Typography variant = 'h6'>{moment(this.state.guest.checkin).format('L')}</Typography>
                            <Typography variant = 'overline'>Check-Out</Typography>
                            <Typography variant = 'h6'>{moment(this.state.guest.checkout).format('L')}</Typography>
                        </div>
                    ) : null}
                    </CardContent>
                </Card>
                </Link>
                <br></br>
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
    
})(GuestPreview))


