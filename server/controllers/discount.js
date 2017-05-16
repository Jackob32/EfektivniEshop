/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = require('./../models/discount');

let Model = mongoose.model('Discounts', Schema);

exports.all = function(req, res) {
    Model.find({}, function(err, items) {
        if (err)
            res.send(err);
        res.json(items);
    });
};

exports.create = function(req, res) {
    let item = new Model(req.body);
    item.save(function(err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};


exports.read = function(req, res) {
    Model.findById(req.params.itemid, function(err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

//res.json({ message: 'hooray! welcome to our api!' });

exports.update = function(req, res) {
    Model.update({_id: req.params.itemid}, req.body, {new: true}, function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};


exports.delete = function (req, res, next) {
    Model.remove({
        _id: req.params.itemid
    }, function (err, item) {
        if (err) next(err);
        res.status(204).json(item);
    });
};
