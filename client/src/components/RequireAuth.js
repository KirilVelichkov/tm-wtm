import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent, requireAdmin) {
    class Authentication extends React.Component {

        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.redirect('/');
            }

            if (requireAdmin) {
                if (!this.props.isAdmin) {
                    this.redirect('/');
                }
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.redirect('/');
            }

            if (requireAdmin) {
                if (!this.props.isAdmin) {
                    this.redirect('/');
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
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps)(Authentication);
}