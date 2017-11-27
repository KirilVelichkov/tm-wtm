import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import Register from '../Admin/Register';
import UsersList from './UsersList';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: false,
            register: false
        };
    }

    toggleTab = (e) => {
        const name = e.target.getAttribute('data-name');
        const state = {};

        for (const key in this.state) {
            state[key] = false;
        }

        this.setState({ ...state, [name]: true });
    }

    render() {
        return (
            <div>
                <hr />
                <div className="tabs-container">
                    <div className={"tab-option " + (this.state.users ? "tab-active" : "")} data-name="users" onClick={this.toggleTab}>Users</div>
                    <div className={"tab-option " + (this.state.register ? "tab-active" : "")} data-name="register" onClick={this.toggleTab}>Register</div>
                </div>
                <div>
                    <div className="tab-content">
                        {this.state.register && <Register />}
                        {this.state.users && <UsersList {...this.props} />}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, { registerUser })(Admin);