import React from 'react';
import { IMAGES_URL } from '../Util/Constants';
import { connect } from 'react-redux';
import {
    blockUser, setAdmin, resetUserPassword,
    unblockUser, unsetAdmin
} from '../../actions/adminAction';

class UsersListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resetPasswordMessage: '',
            setAdminMessage: '',
            setBlockedMessage: '',
            isAdmin: this.props.isAdmin,
            isBlocked: this.props.isBlocked
        };
    }

    handleBlockedClick = () => {
        const id = this.props._id;
        const isBlocked = this.state.isBlocked;

        if (isBlocked) {
            this.props.unblockUser(id)
                .then(() => {
                    this.setState({
                        setBlockedMessage: this.props.setBlockedMessage,
                        isBlocked: false
                    });
                });
        } else {
            this.props.blockUser(id)
                .then(() => {
                    this.setState({
                        setBlockedMessage: this.props.setBlockedMessage,
                        isBlocked: true
                    });
                });
        }
    }

    handleAdminClick = () => {
        const id = this.props._id;
        const isAdmin = this.state.isAdmin;

        if (isAdmin) {
            this.props.unsetAdmin(id)
                .then(() => {
                    this.setState({
                        setAdminMessage: this.props.setAdminMessage,
                        isAdmin: false
                    });
                });
        } else {
            this.props.setAdmin(id)
                .then(() => {
                    this.setState({
                        setAdminMessage: this.props.setAdminMessage,
                        isAdmin: true
                    });
                });
        }
    }

    handleResetPasswordClick = () => {
        const id = this.props._id;

        this.props.resetUserPassword(id)
            .then(() => {
                this.setState({
                    resetPasswordMessage: this.props.resetPasswordMessage
                });
            });

    }

    render() {
        const { avatar, username, email } = this.props;
        const { isAdmin, isBlocked } = this.state;
        
        return (
            <div className="user-item">
                <div className="user-item-container">
                    <img className="user-item-avatar" src={IMAGES_URL + avatar} alt="avatar" />
                    <div>{username}</div>
                </div>
                <div className="user-item-container">
                    <div>Email</div>
                    <div>{email}</div>
                </div>
                <div className="user-item-container">
                    <input type="button" className="button button-attention" value="Reset password" onClick={this.handleResetPasswordClick} />
                    {this.props.resetPasswordMessage && this.state.resetPasswordMessage}
                </div>
                <div className="user-item-container">
                    <input type="button" className="button button-submit" value={isAdmin ? "Unset Admin" : "Set Admin"} onClick={this.handleAdminClick} />
                    {this.props.setAdminMessage && this.state.setAdminMessage}
                </div>
                <div className="user-item-container">
                    <input type="button" className="button button-danger" value={isBlocked ? "Unblock" : "Block"} onClick={this.handleBlockedClick} />
                    {this.props.setBlockedMessage && this.state.setBlockedMessage}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        resetPasswordMessage: state.admin.resetPasswordMessage,
        setAdminMessage: state.admin.setAdminMessage,
        setBlockedMessage: state.admin.setBlockedMessage
    };
}

export default connect(mapStateToProps, { blockUser, setAdmin, resetUserPassword, unblockUser, unsetAdmin })(UsersListItem);