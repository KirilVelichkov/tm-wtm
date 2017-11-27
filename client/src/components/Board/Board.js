import React from 'react';
import { connect } from 'react-redux';

class Board extends React.Component {

    render() {
        return (
            <h1>BOARD!</h1>
        );
    }
}


function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(Board);