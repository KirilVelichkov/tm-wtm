import React, { Component } from 'react';
import { connect } from 'react-redux';

import Routes from './routes';
import Navigation from './components/Navigation/Navigation';

class App extends Component {

    render() {

        return (
            <div className="main">
                <Navigation />
                <Routes />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(App);
