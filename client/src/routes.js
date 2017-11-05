import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Auth from './components/Auth';
import RequireAuth from './components/RequireAuth';

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact render={(defaultProps) => <Auth formType="login" {...defaultProps} />} />
                <Route path="/register" exact render={(defaultProps) => <Auth formType="register" {...defaultProps} />} />
            </Switch>
        );
    }
}
