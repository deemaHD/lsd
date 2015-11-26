'use strict';
var express = require('express'),
    mongoose = require('mongoose'),
    User = require('../models/User'),
    jwt = require('jsonwebtoken'),
    config = require('../config');

// log in handler
exports.postLogin = function (req, res, next) {
    User.findOne({login: req.body.login}, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, 'secret');

                // return the information including token as JSON
                res.json({
                    success: true,
                    id: user._id,
                    token: token
                });
            }   
        }
    });
};

// registration handler
exports.postRegister = function (req, res, next) {
    User.create(req.body, function (err, user) {
        if (err) {
            return next(err);
        }

        res.status(200);
        res.json({success: true, message: 'Registration successfull'});
    });
};


exports.postMe = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.cookies.token || '';
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'secret', function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            res.json({isLogIn: true});
          }
        });
    } else {
        res.json({isLogIn: false});
    }
};

exports.addUser = function (req, res, next) {
    var attributes = {
        phone: req.body.phone,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    };
    User.create(attributes, function (err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
};

exports.putById = function (req, res, next) {
    var params = {};

    if (req.body.login !== '') {
        params.login = req.body.login;
    }

    if (req.body.password !== '') {
        params.password = req.body.password;
    }

    if (req.body.email !== '') {
        params.email = req.body.email;
    }

    if (req.body.phone !== '') {
        params.phone = req.body.phone;
    }

    User.findByIdAndUpdate(req.params.id, {$set: params}, {upsert: false}, function (err, user) {
        if (err) {
            return next(err);
        }

        if(user){
            res.json({success: true});
            console.log('New data: ' + params);
        }
    });
};

exports.findUser = function (req, res, next) {
    var params = {
        login: (req.body.login) ? req.body.login : /.*/,
        email: (req.body.email) ? req.body.email : /.*/
    };
    User.find(params, function (err, users) {
        if (err) {
            return next(err);
        }

        res.json(users);
    });
};

// registration check for unique login
exports.uniqueUser = function (req, res, next) {
    var login = req.query.login;

    //var result = '123';
    User.findOne({'login': login}, function (err, user) {
        if (err) {
            return next(err);
        }
        (user === null)? res.json({unique: true}): res.json({unique: false});
    });

};

// returns current user by decoding user's token
exports.currentUser = function (req, res, next) {
    var user = req.decoded;

    res.json(user);
};
