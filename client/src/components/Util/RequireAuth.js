import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent, requireAdmin) {
    class Authentication extends React.Component {

        componentWillMount() {
            const isLogged = localStorage.getItem('isLogged');
            
            if (!isLogged) {
                if (!this.props.isAuthenticated) {
                    this.redirect('/');
                }
            } else {
                if (requireAdmin) {
                    if (this.props.user) {
                        if (!this.props.user.isAdmin) {
                            this.redirect('/');
                        }
                    }    
                }
            }
        }

        componentWillUpdate(nextProps) {
            const isLogged = localStorage.getItem('isLogged');

            if (!isLogged) {
                if (!nextProps.isAuthenticated) {
                    this.redirect('/');
                }
            } else {
                if (requireAdmin) {
                    if (nextProps.user) {
                        if (!nextProps.user.isAdmin) {
                            this.redirect('/');
                        }
                    }
                }
            }
        }

        redirect = (route) => {
            this.props.history.push(route);
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            user: state.auth.user,
            logged: state.auth.logged
        };
    }

    return connect(mapStateToProps)(Authentication);
}