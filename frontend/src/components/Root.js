import React, { Component } from 'react';
import AuthForm from './AuthForm';
import Home from './Home';

class Root extends Component {
    render() {
        return (
            // based on condition, return either component 1 or 2
            false ? <Home /> : <AuthForm />
        )
    }
};

export default Root;