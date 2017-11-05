import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authAction';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: [
                <Link key="in" to="/login" > Login</Link>,
                <Link key="reg" to="/register" > Register</Link>
            ]
        };
    }

    componentWillReceiveProps(nextProps) {
        const auth = nextProps.isAuthenticated ?
            [
                <Link key="out" to="/" onClick={this.logout}>Logout</Link>
            ]
            :
            [
                <Link key="in" to="/login">Login</Link>,
                <Link key="reg" to="/register">Register</Link>
            ];

        this.setState({ auth });
    }

    logout = () => {
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div>
                <Link key="home" to="/">Home</Link>
                {this.state.auth}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(Navigation);
