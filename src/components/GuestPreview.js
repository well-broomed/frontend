// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Reports extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

    }

    render(){
        console.log(this.props.guest);
        return (
            <div>
                Guest Preview
                <Card>
                    <CardContent>
                    preview
                    </CardContent>

                </Card>
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
    
})(Reports))


