// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';
// Components
import {Navigation} from '../components';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

    }

    render(){
        return (
            <div>
                <Navigation />
                
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
    
})(Home))


