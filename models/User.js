const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../').secret;

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    image: String,
    salt: String,
    hash: String
}, {
    timestamps: true
});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, secret);
};

UserSchema.methods.toAuthJson = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        image: this.image
    };
};

mongoose.model('User', UserSchema);
