import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const styles = {
    card: {
        maxWidth: 600,
        margin: '20px auto',
    },
    media: {
        objectFit: 'cover'
    },
}

class PropertyPreview extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            // state
        }
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Card className = {classes.card} key = {this.props.property.id}>
                        <CardHeader title = {this.props.property.property_name} subheader = {this.props.property.address}>
                        </CardHeader>

                        <CardContent>
                            Content

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
    // actions,
    
})(withStyles(styles)(PropertyPreview)));