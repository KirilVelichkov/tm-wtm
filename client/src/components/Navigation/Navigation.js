import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserMenu from '../User/UserMenu';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: []
        };
    }

    render() {
        const auth = this.props.isAuthenticated && [];
        
        if (this.props.user) {
            auth.push(<Link key="board" to="/board">Board</Link>);
            auth.push(<UserMenu key="menu" />);
        }

        return (
            <div className="navigation">
                {auth}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(Navigation);
