import React from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/adminAction';
import UsersListItem from './UsersListItem';

class UsersList extends React.Component {

    componentWillMount() {
        this.props.dispatch(getAllUsers());
    }

    renderUsersList = (users) => {
        return users.map((user) => {
            return <UsersListItem key={user._id} {...user} />;
        });
    }

    render() {
        const { users } = this.props;

        return (
            <div>
                {users && this.renderUsersList(users)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.admin.users
    };
}

export default connect(mapStateToProps)(UsersList);