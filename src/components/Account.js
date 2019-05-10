// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

    }


    sendEmail = () => {
    }

    render(){
        return (
            <div>
                <button
                onClick={this.sendEmail}
                >
                    Send Email
                </button>
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
    
})(Account))


