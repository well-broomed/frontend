// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';
// Axios
import axios from 'axios';


class Account extends React.Component {
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
        const backendUrl = process.env.backendURL|| 'http://localhost:5000';
        try {
           const res = await axios.post(`${backendUrl}/api/invites/`,this.state.email);
           console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    render(){
        return (
            <div>
            <form>
                <input
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    placeholder="Assistant Email"
                    type="text"
                    name="email"
                />
                <button 
                type="submit"
                onClick={this.sendEmail}
                >
                    Send Email
                </button>
            </form>
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


