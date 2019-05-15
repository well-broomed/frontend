import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {changeCleaner} from '../actions/propertyActions';

const styles = {
    card: {
        maxWidth: 600,
        margin: '20px auto',
    },
    media: {
        objectFit: 'cover'
    },
    formControl: {
        margin: '20px',
        minWidth: 120,
    },
}

class PropertyPreview extends React.Component {

    componentDidUpdate(prevProps){
        /**
         * We need to set the default cleaner for the house.
         */
        if((this.props.cleaners !== prevProps.cleaners) && this.props.cleaners){
            if(this.props.cleaners.length === 1){
                this.setState({
                    cleaner: this.props.cleaners[0],
                    cleaner_name: this.props.cleaners[0].user_name,
                    cleaner_id: this.props.cleaners[0].user_id
                })
            } else {
                let defaultCleaner = this.props.cleaners.map(cleaner => {
                    if(cleaner.user_id === this.props.property.cleaner_id){
                        return cleaner;
                    }
                })
                this.setState({
                    cleaner: defaultCleaner,
                    cleaner_name: defaultCleaner.user_name,
                    cleaner_id: defaultCleaner.user_id,
                })
            }
        }
        
    }

    constructor(props){
        super(props);

        this.state = {
            // state
            cleaner: null,
            cleaner_id: null,
            cleaner_name: null,
        }
    }

    handleSelect = event => {
        console.log('select', event.target.value);
        this.setState({
            cleaner_name: event.target.value.user_name,
            cleaner_id: event.target.value.user_id,
            cleaner: event.target.value
        })

        console.log('trigger change cleaner function');
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Card className = {classes.card} key = {this.props.property.id}>
                        <CardHeader title = {this.props.property.property_name} subheader = {this.props.property.address}>
                        </CardHeader>

                        <CardContent>
                            cleaners
                            {this.state.cleaner ? (
                            <form autoComplete='off'>
                            <FormControl className = {classes.formControl}>
                                <InputLabel shrink htmlFor='cleaner-label-placeholder'>Cleaner</InputLabel>
                                <Select value = {this.state.cleaner_name} 
                                onChange = {this.handleSelect} 
                                input={<Input name = 'cleaner' id='cleaner-label-placeholder' />}
                                name = 'cleaner'>
                                <MenuItem value = {this.state.cleaner}>{this.state.cleaner.user_name}</MenuItem>
                                {this.props.cleaners ? this.props.cleaners.map(cleaner => {
                                    return <MenuItem value = {cleaner} key = {cleaner.user_id}>{cleaner.user_name}</MenuItem>
                                }) : null}
                                
                                </Select>
                            </FormControl>
                            </form>
                            ) : null}
                            
                        </CardContent>
                        </Card>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // state items
        cleaners: state.propertyReducer.cleaners,
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    changeCleaner,
    
})(withStyles(styles)(PropertyPreview)));