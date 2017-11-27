import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.formData = {};

        this.state = {
            error: {
                email: false,
                password: false
            },
            test: false,
            text: "asdfas fdsa fsda fds fdsa fdsa f"
        };
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/board');
        }
    }


    componentWillUpdate(nextProps) {
        if (nextProps.isAuthenticated) {
            this.props.history.push('/board');
        }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        const error = {};
        for (let ref in this.refs) {
            this.formData[ref] = this.refs[ref].value.trim();
            error[ref] = !this.refs[ref].value.trim();
        }

        this.setState({ error });
        if (!error.email && !error.password) {
            this.props.loginUser(this.formData);
        }
    }

    test = () => {
        const test = this.state.test;
        this.setState({
            test: !test,
            text: " aaaaaaaa aaaa aaaaaaaa aaaa aaaaaaaa aaaa aaaaaaaa aaaa aaaaaaaa aaaa aaaaaaaa aaaa aaaaaaaa aaaa aaaaaaaa aaaa aaaaaaaa aaaa aaaaaaaa aaaa aaaaaaaa aaaa"
        });
    }

    renderForm() {
        return (
            <div style={{ height: this.state.test ? 500 : 300, overflow: "hidden", position: "relative",border:"1px solid red" }} className={"test " + (this.state.test ? "animate" : "animate")}>
                <div>
                    {this.state.text}
                </div>
                <button onClick={this.test}>TTT</button>
                <div className="login-form">
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
                    {this.props.invalidLogin && <div className="text-form-error">Invalid email or password!</div>}
                    <input
                        value="Login"
                        type="button"
                        className="button button-submit"
                        onClick={this.handleSubmit} />
                </div>
            </div>
        );
    }

    render() {
        return this.props.isAuthenticated === false ? this.renderForm() : null;
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        invalidLogin: state.auth.invalidLogin
    };
}


export default connect(mapStateToProps, { loginUser })(Login);