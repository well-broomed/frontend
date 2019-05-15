// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';
// Axios
import axios from 'axios';
//Material-UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

class Partners extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          email:''
        };

    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
    sendEmail = async (e) => {
      // if(!this.state.email)
      //     return;
      e.preventDefault();
      console.log('sending email');

      let token = localStorage.getItem('jwt');
      let userInfo = localStorage.getItem('userInfo');

      let options = {
          headers: {
              Authorization: `Bearer ${token}`,
              'user-info': userInfo,
          }   
      }

      let body = {
          cleaner_email: this.state.email
      }
      
      const backendUrl = process.env.backendURL|| 'http://localhost:5000';
      try {
         const res = await axios.post(`${backendUrl}/api/invites/`, body, options);
      }
      catch (err) {
          console.log(err);
      }
  }

    render(){
        return (
            <div>
              <Typography variant='h2'>Partners</Typography>
              <div>
                  <Typography variant='h5'> Send an invite to add more partners! </Typography>
                  <TextField
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      placeholder="Partner's Email"
                      type="text"
                      name="email"
                  />
                  <Button
                  type="submit"
                  onClick={this.sendEmail}
                  >
                      Send Invite
                  </Button>
                </div>
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
    
})(Partners))