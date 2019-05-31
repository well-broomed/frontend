import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class Invite extends Component {
    constructor(props){
        super(props);
        this.state = {
            successful: false
        }
    }

async componentDidMount() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`;
    const inviteCode = this.props.match.params.invite_code;
    const response = await axios.get(`${backendUrl}/inviteRoutes/accept/${inviteCode}`)

}

    render() {
        return (
            <div>
                
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps,
)(Invite);