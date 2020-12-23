import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import Home from './Home';

class Root extends Component {
    render() {
        return (
            // based on condition, return either component 1 or 2
            this.props.account.loggedIn ? <Home /> : <AuthForm />
        )
    }
};

export default connect(
    ({ account }) => ({ account }),
    null // no action creators to bind, so we're good
)(Root);