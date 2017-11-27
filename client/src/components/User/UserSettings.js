import React from 'react';
import { connect } from 'react-redux';

import ImagesList from '../Images/ImagesList';
import { IMAGES_URL } from '../Util/Constants';

class UserSetting extends React.Component {

    renderSettings = (settings) => {
        const avatar = this.props.selectedAvatar ? this.props.selectedAvatar : settings.avatar;

        return [
            <div key="username">{settings.username}</div>,
            <div key="email">{settings.email}</div>,
            <img key="img" src={IMAGES_URL + avatar} alt="avatar" />,
            <label key="password">New password
                <input type="text" />
            </label>
        ];
    }



    render() {
        const userSettings = this.props.user && this.renderSettings(this.props.user);
        
        return (
            <div>
                <h1>USER SETTINGS</h1>
                {userSettings}
                <button>Submit</button>
                <ImagesList/>
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

export default connect(mapStateToProps)(UserSetting);