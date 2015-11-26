'use strict';
function resetRouter () {
    var mongoose = require('mongoose'),
        Item = require('../models/Item'),
        User = require('../models/User'),
        async = require('async'),
        defaults,
        collections;

    collections = {
        Item: Item,
        User: User
    };

    defaults = {
        User: require('../defaults/usersDefault.json'),
        Item: require('../defaults/itemsDefault.json')
    };

    return {
        resetCollections: resetCollections
    };

    function  resetCollections(req, res, next) {
        reset(function () {
            res.send("DBs successfully reseted! <a href='/'> BACK</a><br>");
            console.log("DBs successfully reseted!");
        });

    }

    function reset (callback) {
        async.series([
            clearCollections,
            setDefaults
        ], callback);
    }

    function clearCollections (callback) {
        async.each(
            collections,
            function (collectionName, callback) {
                collectionName.remove({}, callback);
            },
            callback
        );
    }

    function setDefaults (callback) {
        async.forEachOf(
            collections,
            function (currentCollection, key, callback) {
                var  currentDefault = defaults[key];

                currentCollection.collection.insert(currentDefault, callback);
            },
            callback
        );
    }
}

module.exports = resetRouter;