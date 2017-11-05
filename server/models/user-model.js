'use strict';

const mongoose = require('mongoose');
const encryption = require('../utils/encryption');

mongoose.Promise = global.Promise

function hasRole(user, role) {
    return user.roles.indexOf(role.toLowerCase()) >= 0;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    passHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
                let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    salt: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: '58446e0a2374e32570d0fb06'
    },
    isAdmin: Boolean,
    isBlocked: Boolean
});

userSchema.method({
    hashedPasswordMatchInputPassword: function (password) {
        let inputHashedPassword = encryption.generateHashedPassword(this.salt, password);

        if (inputHashedPassword === this.passHash) {
            return true;
        }

        return false;
    }
});

userSchema.method({
    assignRole: function (role) {
        let roleToLower = role.toLowerCase();
        if (!hasRole(this, roleToLower)) {
            this.roles.push(roleToLower);
        }
    },
    removeRole: function (role) {
        let roleToLower = role.toLowerCase();
        if (hasRole(this, roleToLower)) {
            this.roles.splice(this.roles.indexOf(roleToLower), 1);
        }
    },
    generatePassHash: function (password) {
        let inputHashedPassword = encryption.generateHashedPassword(this.salt, password);
        return inputHashedPassword;
    }
});

mongoose.model('User', userSchema);
module.exports = mongoose.model('User');