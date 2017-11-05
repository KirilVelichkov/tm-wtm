import React from 'react';
import { registerUser } from '../actions/authAction';

export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
    }

    handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.user[key] = value;
    }

    handleSubmit = () => {
        console.log(this.user);
    }

    render() {
        return (
            <div>
                <h1>REGISTER!</h1>
                <label>Username
                <input type="text" name="username" onChange={this.handleChange} />
                </label>
                <br />
                <label>Email
                <input type="text" name="email" onChange={this.handleChange} />
                </label>
                <br />
                <label>Password
                <input type="text" name="password" onChange={this.handleChange} />
                </label>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}