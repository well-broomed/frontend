import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';

const MainRedirect = styled.div`

    margin-top: 100px;

    `;

class Redirect extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            type: '',
        }
    }

    handleSelection = event => {
        event.preventDefault();

        this.setState({
            type: event.target.name,
        })
    }

    render(){
        return (
            <MainRedirect>
                Select your account type
                <button name = 'manager' onClick={this.handleSelection}>Property Manager</button>
                <button name = 'assistant' onClick = {this.handleSelection}>Assistant</button>
            </MainRedirect>

                

        )
    }
}

const mapStateToProps = state => {
    return {
        //state
    }
}


export default withRouter(connect(mapStateToProps, {
    // actions
    
})(Redirect));