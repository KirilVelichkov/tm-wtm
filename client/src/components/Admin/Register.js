import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.formData = {};

        this.state = {
            error: {
                email: false,
                password: false,
                username: false,
                isAdmin: false
            }
        };
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        const error = {};
        for (let ref in this.refs) {
            if (this.refs[ref].type === 'checkbox') {
                this.formData[ref] = this.refs[ref].checked;
            } else {
                this.formData[ref] = this.refs[ref].value.trim();
            }
            error[ref] = !this.refs[ref].value.trim();
        }

        this.setState({ error });

        if (!error.email && !error.password && !error.username) {
            this.props.registerUser(this.formData);
        }

        
    }

    clearForm = () => {
        for (let ref in this.refs) {
            if (this.refs[ref].type === 'checkbox') {
                this.refs[ref].checked = false;
            } else {
                 this.refs[ref].value = '';
            }
        }
    }

    render() {
        
        if (this.props.successMessage) {
            this.clearForm();
        }

        return (
            <div className="register-form">
                <h1>Register user</h1>
                <input
                    ref="username"
                    className="textbox-default"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onKeyPress={this.handleKeyPress} />
                {this.state.error.username && <div className="text-form-error">Please enter a username!</div>}
                <input
                    ref="email"
                    className="textbox-default"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onKeyPress={this.handleKeyPress} />
                {this.state.error.email && <div className="text-form-error">Please enter an email!</div>}
                <input
                    ref="password"
                    className="textbox-default"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onKeyPress={this.handleKeyPress} />
                {this.state.error.password && <div className="text-form-error">Please enter a password!</div>}
                <label>
                    <input type="checkbox" ref="isAdmin" className="checkbox-form" onKeyPress={this.handleKeyPress} />
                    <span>Admin</span>
                </label>
                {this.props.invalidRegister && <div className="text-form-error">{this.props.errorMessage}</div>}
                <input type="button" value="Submit" className="button button-submit" onClick={this.handleSubmit} />
                {this.props.successMessage && <div className="text-form-success">{this.props.successMessage}</div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        invalidRegister: state.auth.invalidRegister,
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage
    };
}

export default connect(mapStateToProps, { registerUser })(Register);