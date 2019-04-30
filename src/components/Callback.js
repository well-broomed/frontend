import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {checkIfUserExists} from '../actions/index';

import Auth from './Auth';

const auth = new Auth();

class Callback extends React.Component {

    async componentDidMount(){
        await auth.handleAuthentication().then(status => {
            this.props.checkIfUserExists();
        });
    }

    componentDidUpdate(){
        if(this.props.userChecked === true){
            this.props.history.replace('/groups');
        }
    }

    render(){
        return(
            <div>
                Callback Component
                Loading...
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // state items
        userChecked: state.userChecked
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    checkIfUserExists,
})(Callback))