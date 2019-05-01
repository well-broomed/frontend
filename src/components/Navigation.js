import React from 'react';

import AppBar from '@material-ui/core/AppBar';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Navigation extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            // nav state, to handle search inputs, modals, etc
        }
    }

    render(){
        return (
            <div className = 'nav-container'>
            <AppBar />
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
    
})(Navigation))