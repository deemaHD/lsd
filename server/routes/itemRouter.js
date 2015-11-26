var express = require('express'),
    mongoose = require('mongoose'),
    Item = require('../models/Item'),
    fs = require('fs'),
    path = require('path');


exports.post = function (req, res, next) {
console.log(req.decoded);
    var attributes = {
        title: req.body.title,
        price: req.body.price,
        user_id: req.decoded._id,
        user: {
            login: req.decoded.login,
            email: req.decoded.email,
            phone: req.decoded.phone
        }
    };

    Item.create(attributes,  function (err, item) {
        if (err) {
            return next(err);
        }
        res.json(item);
    });
};

exports.postImage = function (req, res, next) {
    var file = req.files.file,
        fileName = file.originalFilename;

    Item.findById(req.params.id, function (err, item) {
        if (err) {
            return next(err);
        }

        if(item){

            var directoryPath = '../public/app/item-images/' + item._id,
                filePath = directoryPath + '/' + fileName,
                oldPath = file.path,
                newPath = path.join(filePath),
                pathForPublic = 'item-images/' + item._id + '/'  + fileName;

            fs.mkdirSync(path.join(directoryPath));

            copy();
                function copy () {
                    var readStream = fs.createReadStream(oldPath);
                    var writeStream = fs.createWriteStream(newPath);
                    readStream.on('error', function () {
                        console.log('eror in resd stim');
                    });
                    writeStream.on('error', function (err) {
                        console.log(err);
                    });
                    readStream.on('close', function () {
                        fs.unlink(oldPath, function () {
                            item.img = pathForPublic;
                            console.log(item);
                            item.save(function () {
                                res.json(item);
                            });
                        });
                    });
                    readStream.pipe(writeStream);
                }
        }
    });
};

exports.get = function (req, res, next) {
    var params = {},
        orderBy;

    if(req.query.title){
        params.title = req.query.title;
    }


    if(req.query.order_by && req.query.order_by == 'price'){
        orderBy = req.query.order_by;
    } else {
        orderBy = 'created_at';
    }

    if(req.query.order_type && req.query.order_type === 'asc'){
        orderBy = orderBy;
    } else {
        orderBy = '-' + orderBy;
    }
    console.log(orderBy);
    Item.find(params)
        .sort(orderBy)
        .exec(function (err, items) {
            if (err) {
                return next(err);
            }
            res.json(items);
        });
};

exports.getById = function (req, res, next) {
    Item.findById(req.params.id, function (err, item) {
        if (err) {
            return next(err);
        }

        if(item){
            res.json(item);
        }
    });
};

exports.put = function (req, res, next) {
    var params = {};

    if(req.body.title){
        params.title = req.body.title;
    }

    if(req.body.price){
        params.price = req.body.price;
    }

    Item.findByIdAndUpdate(req.params.id, {$set: params}, {new: true}, function (err, item) {
        if (err) {
            return next(err);
        }

        if(item){
            res.json(item);
        }
    });
};

exports.delete = function (req, res, next) {

    Item.findByIdAndRemove(req.params.id, function (err, item) {
        if (err) {
            return next(err);
        }

        if(item){
            res.status(200);
            res.send();
        } else {
            res.status(404);
            res.send();
        }

    });
};

// returns all items added by current user
exports.userItems = function (req, res, next) {
    var userId = req.decoded._id,
        userItems = [];

    Item.find()
        .exec(function (err, items) {
            if (err) {
                return next(err);
            }

            items.forEach(function (el) {
                if (el.user_id === userId) {
                    userItems.push(el);
                }
            });

            res.json(userItems);
        });
};
