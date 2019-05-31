// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

import {fetchAllGuests} from '../actions/index';

class Guests extends React.Component {

    componentDidMount(){
        if(!this.props.guests){
            this.props.fetchAllGuests();
        }
    }

    constructor(props){
        super(props);
        this.state = {};

    }

    render(){
        return (
            <div>



            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // state items
        guests: state.guestReducer.guests,
        refreshGuests: state.guestReducer.refreshGuests,
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    fetchAllGuests,
})(Guests))


