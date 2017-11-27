import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireAuth from './components/Util/RequireAuth';
import Board from './components/Board/Board';
import Login from './components/User/Login';
import Admin from './components/Admin/Admin';
import NotFound from './components/Util/NotFound';
import UserSettings from './components/User/UserSettings';

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/admin" exact component={RequireAuth(Admin, true)} />
                <Route path="/board" exact component={RequireAuth(Board)} />
                <Route path="/user/settings" exact component={RequireAuth(UserSettings)} />
                <Route path="*" exact component={NotFound} />
            </Switch>
        );
    }
}
