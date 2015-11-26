'use strict';
var mongoose = require('mongoose'),
    UserSchema;

UserSchema = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    phone: String,
    email: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);
