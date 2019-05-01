// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

class Partners extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

    }

    render(){
        return (
            <div></div>
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
    
})(Partners))


