// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

// Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = {
    card: {
        maxWidth: 400,
    },
    media: {
        height: 200,
    }
}

class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            password1: '',
            password2: '',
        };
    }

    render(){
        const {classes} = this.props;
        console.log(this.props.currentUser);
        return (
            <div>
                <Typography variant = 'h2'>Account</Typography>
                {this.props.currentUser ? (
                     <Card className = {classes.card}>
                     <CardActionArea>
                         <CardMedia className = {classes.media} 
                         image = {this.props.currentUser.img_url} 
                         title = 'Profile Picture'/>
                     </CardActionArea>
                     <CardContent>
                        <Typography variant = 'overline'>Username</Typography>
                        <Typography variant = 'h6'>{this.props.currentUser.user_name}</Typography>

                        <Typography variant = 'overline'>Email</Typography>
                        <Typography variant = 'h6'>{this.props.currentUser.email}</Typography>

                        <Typography variant = 'overline'>Account Type</Typography>
                        <Typography variant = 'h6'>{this.props.currentUser.role}</Typography>
                     </CardContent>
 
 
                 </Card>
                ) : null}
               


            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // state items
        currentUser: state.authReducer.currentUser
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    
})(withStyles(styles)(Account)));