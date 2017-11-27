import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/authAction';

import { IMAGES_URL } from '../Util/Constants';

class UserMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuVisible: false
        };
    }

    logout = () => {
        this.props.dispatch(logoutUser());
    }

    toggleMenu = () => {
        const isMenuVisible = !this.state.isMenuVisible;

        this.setState({ isMenuVisible });
    }

    render() {
        const user = this.props.user;
        const isMenuVisible = this.state.isMenuVisible;

        return (
            <div className="user-menu-container">
                <div className="user-menu-image-container">
                    <img onClick={this.toggleMenu} className="user-menu-avatar" src={IMAGES_URL + user.avatar} alt="avatar" />
                </div>
                <div className={"user-menu-options-container" + (isMenuVisible ? " user-menu-options-container-active" : "")}>
                    {this.props.user.isAdmin &&
                        <div>
                            <Link key="reg" to="/admin">Admin</Link>
                        </div>
                    }
                    <div>
                        <Link key="reg" to="/user/settings">Settings</Link>
                    </div>
                    <div>
                        <Link key="out" to="/" onClick={this.logout}>Logout</Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        selectedAvatar: state.images.selectedAvatar
    };
}

export default connect(mapStateToProps)(UserMenu);