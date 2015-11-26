'use strict';
var mongoose = require('mongoose'),
    ItemSchema,
    UserSchema,
    Item;

UserSchema = new mongoose.Schema({
    login: {type: String, required: true},
    phone: String,
    email: {type: String, required: true}
});

ItemSchema = new mongoose.Schema({
    created_at: {type: Date, default: Date.now},
    title: String,
    price: Number,
    user_id: String,
    user: [UserSchema],
    img: String
});

Item = mongoose.model('Item', ItemSchema);

Item.schema.path('title').validate(function (value) {
    return value.length > 2;
}, 'Title should contain at least 3 characters');

module.exports = Item;