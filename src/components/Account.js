// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';

import {updateUserProfile, updateUserPicture, checkIfUserExists} from '../actions/index';

// FlexBox

// Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

// Icons 
import EditTwoTone from '@material-ui/icons/EditTwoTone';

// Styled Components
import styled from 'styled-components';

const FlexRowNoWrap = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    `;

const FlexColNoWrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    `;

const styles = {
    card: {
        maxWidth: 400,
        marginTop: 20,
    },
    media: {
        height: 200,
    }
}

class Account extends React.Component {

    componentDidMount(){
        if(!localStorage.getItem('jwt')){
			this.props.history.replace('/');
        }
        
        this.props.checkIfUserExists(localStorage.getItem('role'));

        if(this.props.currentUser){
            this.setState({
                username: this.props.currentUser.user_name,
                email: this.props.currentUser.email,
                passwordOpen: false,
                usernameOpen: false,
                emailOpen: false,
            })
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.currentUser !== prevProps.currentUser){
            this.setState({
                username: this.props.user.user_name,
                email: this.props.user.email,
                passwordOpen: false,
                usernameOpen: false,
                emailOpen: false,
            })
        }
    }
    // set default input values
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
        let changes = {};
        let user_id = this.props.user.user_id;
        if(event.target.name === 'username'){
            changes.user_name = this.state.username;
            this.props.updateUserProfile(user_id, changes);
        } else if(event.target.name === 'password'){
            if(this.state.password1 === this.state.password2){
                changes.password = this.state.password2;
                this.props.updateUserProfile(user_id, changes);
            } else {
                window.alert('Passwords must match! Please re-enter your passwords.');
            }
        } else if (event.target.name === 'email'){
            /**
             * TODO: MAKE SURE THE EMAIL IS A VALID ADDRESS
             */

            changes.email = this.state.email;
            this.props.updateUserProfile(user_id, changes);
        } else if(event.target.name === 'image'){
            const changesForm = new FormData();
            changesForm.append("File", event.target.files[0], event.target.files[0].name)
            this.props.updateUserPicture(user_id, changesForm);
        }
    }

    render(){
        const {classes} = this.props;
        return (
            <div>
                <div style = {{padding: '20px 0px'}}>
                <Typography variant = 'h2'>Account</Typography>
                </div>
                {(this.props.userChecked && this.props.user) ? (
                    <div>
                        {this.props.user.auth_provider === 'auth0' ? (

                        
                     <Card className = {classes.card}>
                     <CardActionArea>
                         <CardMedia className = {classes.media} 
                         image = {this.props.user.img_url} 
                         title = 'Profile Picture'/>
                     </CardActionArea>
                     <CardContent>
                        {/* <div> // Needs a constant live token on backend, out for now.
                        <Typography variant = 'overline'> Change Profile Picture </Typography>
                        <input
							value={undefined}
							accept="image/*"
                            id="icon-button-file"
							onChange={e => {this.handleSubmit(e)}}
                            name="image"
							type="file"
							style={{ display: 'none' }}
						/>
                        <label htmlFor="icon-button-file">
                             <IconButton  component="span" name = 'profilepic'><EditTwoTone name = 'profilepic'/>
                            </IconButton>
                        </label>
                            </div> */}
                        <Typography variant = 'overline'>Username</Typography>
                        {!this.state.usernameOpen ? (
                            <FlexRowNoWrap>
                            <Typography variant = 'h6'>{this.props.user.user_name}</Typography>
                            <IconButton onClick = {this.toggleInput} name = 'usernameOpen'><EditTwoTone name = 'usernameOpen'/></IconButton>
                            </FlexRowNoWrap>
                        ) : null}

                        
                        {this.state.usernameOpen ? (
                            <form name = 'username' onSubmit = {this.handleSubmit}>
                            <FlexColNoWrap>
                            <TextField variant = 'outlined' label = 'New Username' name = 'username' value = {this.state.username} onChange = {this.handleInput}></TextField>
                        
                            <FlexRowNoWrap>
                            <Button onClick = {this.toggleInput} name = 'usernameOpen'><div name = 'usernameOpen' onClick = {this.toggleInput}>Cancel</div></Button>
                            <Button type = 'submit'>Submit</Button>
                            </FlexRowNoWrap>
                            </FlexColNoWrap>
                        </form>
                        ) : null}
                        

                        <Typography variant = 'overline'>Email</Typography>
                        {!this.state.emailOpen ? (
                            <FlexRowNoWrap>
                            <Typography variant = 'h6'>{this.props.user.email}</Typography>
                            <IconButton onClick = {this.toggleInput} name = 'emailOpen'><EditTwoTone name = 'emailOpen'/></IconButton>
                            </FlexRowNoWrap>
                        ) : null}

                        
                        {this.state.emailOpen ? (
                            <form name = 'email' onSubmit = {this.handleSubmit}>
                            <FlexColNoWrap>
                            <TextField variant = 'outlined' label = 'New Email' name = 'email' value = {this.state.email} onChange = {this.handleInput}></TextField>
                        
                            <FlexRowNoWrap>
                            <Button onClick = {this.toggleInput} name = 'emailOpen'><div name = 'emailOpen' onClick = {this.toggleInput}>Cancel</div></Button>
                            <Button type = 'submit'>Submit</Button>
                            </FlexRowNoWrap>
                            </FlexColNoWrap>
                        </form>
                        ) : null}

                        <Typography variant = 'overline'>Account Type</Typography>
                        <Typography variant = 'h6'>{this.props.user.role}</Typography>

                        <Typography variant = 'overline'>Password</Typography>
                            <br></br>
                        {!this.state.passwordOpen ? (
                            <Button variant = 'contained' color = 'secondary' onClick = {this.toggleInput} name = 'passwordOpen'>
                                <div style = {{width: '100%'}} className = 'password-btn' name = 'passwordOpen' onClick = {this.toggleInput}>
                                Change Password
                                </div>
                            </Button>
                        ) : null}
                        
                        {this.state.passwordOpen ? (
                            <form name = 'password' onSubmit = {this.handleSubmit}>
                            <FlexColNoWrap>
                                <TextField variant = 'outlined' label = 'New Password' type = 'password' name = 'password1' value = {this.state.password1} onChange = {this.handleInput}></TextField>
                                <TextField variant = 'outlined' label = 'New Password (Again)' type = 'password' name = 'password2' value = {this.state.password2} onChange = {this.handleInput}></TextField>    
                                
                                <FlexRowNoWrap>
                                    <Button><div name = 'passwordOpen' onClick = {this.toggleInput}>Cancel</div></Button>
                                    <Button type = 'submit'>Submit</Button>
                                </FlexRowNoWrap>
                            </FlexColNoWrap>
                            </form>
                        ) : null}
                        
                     </CardContent>
 
 
                 </Card>
                 ) : (
                    <div>
                        <Card className = {classes.card}>
                     <CardActionArea>
                         <CardMedia className = {classes.media} 
                         image = {this.props.user.img_url} 
                         title = 'Profile Picture'/>
                     </CardActionArea>
                     <CardContent>
                        <Typography variant = 'overline'>Username</Typography>
                        <Typography variant = 'h6'>{this.props.user.user_name}</Typography>
                        

                        <Typography variant = 'overline'>Email</Typography>
                        <Typography variant = 'h6'>{this.props.user.email}</Typography>

                        <Typography variant = 'overline'>Account Type</Typography>
                        <Typography variant = 'h6'>{this.props.user.role}</Typography>

                        <Typography variant = 'overline'>Login Provider</Typography>
                        <Typography variant = 'h6'>{this.props.user.auth_provider}</Typography>
                        <br></br>
                        <Typography variant = 'subtitle2' color = 'textSecondary'>Because you are logged in via a social login provider, your user profile data is read-only.</Typography>
                        
                     </CardContent>
 
                 </Card>
                    </div>
                )}

                 </div>
                ) : <h1>Loading...</h1>}
            
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // state items
        user: state.authReducer.user,
        userChecked: state.authReducer.userChecked,
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    updateUserProfile,
    updateUserPicture,
    checkIfUserExists,
    
})(withStyles(styles)(Account)));