import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap'; 
import { signup } from '../actions/account';
import fetchStates from '../reducers/fetchStates';

class AuthForm extends Component {
    state = { username: '', password: '' };

    updateUsername = event => {
        // capture info about what user typed in form control
        this.setState({ username: event.target.value });
    }

    updatePassword = event => {
        // capture info about what user typed in form control
        this.setState({ password: event.target.value });
    }

    signup = () => {
        const { username, password } = this.state;
        this.props.signup({ username, password });
        console.log('this.state signup', this.state);
    }

    login = () => {
        console.log('this.state login', this.state);
    }

    Error = () => {
        // make sure that we have access to account states, so fix mapstatetoprops
        if (this.props.account.status === fetchStates.error) {
            // display message
            return <div>{this.props.account.message}</div>
        }
    }

    render() {
        return (
            <div>
                <h2>Dragon Stack</h2>
                <FormGroup>
                    <FormControl 
                        type='text'
                        value={this.state.username}
                        placeholder='username'
                        onChange={this.updateUsername}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                        type='password'
                        value={this.state.password}
                        placeholder='password'
                        onChange={this.updatePassword}
                    />
                </FormGroup>
                <div>
                    <Button onClick={this.login}>Log In</Button>
                    <span> or </span>
                    <Button onClick={this.signup}>Sign Up</Button>
                </div>
                <br />
                {this.Error}
            </div>
        );
    }
}

// export default AuthForm;
export default connect(
    ({ account }) => ({ account }), 
    { signup }
)(AuthForm);