// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

// FlexBox

// Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

// Icons 
import EditTwoTone from '@material-ui/icons/EditTwoTone';
import Icon from '@material-ui/core/Icon';

// Styled Components
import styled from 'styled-components';

const FlexRowNoWrap = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    `;

const styles = {
    card: {
        maxWidth: 400,
    },
    media: {
        height: 200,
    }
}

class Account extends React.Component {

    // set default input values
    componentDidUpdate(prevProps){
        if(this.props.currentUser !== prevProps.currentUser){
            this.setState({
                username: this.props.currentUser.user_name
            })
        }
    }

    constructor(props){
        super(props);
        this.state = {
            passwordOpen: false,
            password1: '',
            password2: '',
            username: '',
            usernameOpen: false,
            emailOpen: false,
            email: '',
        };
    }

    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })

    }

    toggleInput = event => {
        event.preventDefault();
        let name;
        /**
         * So this is a tricky bit due to material UI svg icons.
         * If you click on the svg itself, the usual onClick event 'name' passage will not work.
         * So, you have to traverse two levels up the DOM to gather the proper name
         * in order for the dynamic state assignment to fire properly.
         */
        if(event.target.tagName === 'path'){
            name = event.target.parentNode.parentNode.getAttribute('name');
            this.setState({
                [name]: !this.state[name]
            });
        } else {
            name = event.target.getAttribute('name');
            this.setState({
                [name]: !this.state[name]
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render(){
        const {classes} = this.props;
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
                        {!this.state.usernameOpen ? (
                            <FlexRowNoWrap>
                            <Typography variant = 'h6'>{this.props.currentUser.user_name}</Typography>
                            <IconButton onClick = {this.toggleInput} name = 'usernameOpen'><EditTwoTone name = 'usernameOpen'/></IconButton>
                            </FlexRowNoWrap>
                        ) : null}

                        
                        {this.state.usernameOpen ? (
                            <form onSubmit = {this.handleSubmit}>
                            <TextField variant = 'outlined' label = 'Username' name = 'username' value = {this.state.username} onChange = {this.handleInput}></TextField>
                        

                            <Button type = 'submit'>Submit</Button>
                            <Button><div name = 'usernameOpen' onClick = {this.toggleInput}>Cancel</div></Button>
                        </form>
                        ) : null}
                        

                        <Typography variant = 'overline'>Email</Typography>
                        <Typography variant = 'h6'>{this.props.currentUser.email}</Typography>

                        <Typography variant = 'overline'>Account Type</Typography>
                        <Typography variant = 'h6'>{this.props.currentUser.role}</Typography>

                        
                        {!this.state.passwordOpen ? (
                            <Button variant = 'contained' color = 'secondary'>
                                <div className = 'password-btn' name = 'passwordOpen' onClick = {this.toggleInput}>
                                Change Password
                                </div>
                            </Button>
                        ) : null}
                        
                        {this.state.passwordOpen ? (
                            <form onSubmit = {this.handleSubmit}>
                            <TextField variant = 'outlined' label = 'New Password' type = 'password' name = 'password1' value = {this.state.password1}></TextField>
                            <TextField variant = 'outlined' label = 'New Password (Again)' type = 'password' name = 'password2' value = {this.state.password2}></TextField>    
                            
                            <Button type = 'submit'>Submit</Button>
                            <Button><div name = 'passwordOpen' onClick = {this.toggleInput}>Cancel</div></Button>
                            </form>
                        ) : null}
                        
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