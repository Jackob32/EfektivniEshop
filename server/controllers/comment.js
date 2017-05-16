/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = require('./../models/comment');

let Model = mongoose.model('Comments', Schema);


exports.all = function (req, res, next) {
    Model.find({}, function(err, comments) {
        if (err) next(err);
        res.status(200).json(comments);
    });
};

exports.create = function (req, res, next) {
    let new_Comment = new Model();
    (req.body.author!==undefined && req.body.author!="") ? new_Comment.author = req.body.author : res.send("Nebyl vyplněn author");
    (req.body.text!==undefined && req.body.text!="") ? new_Comment.text = req.body.text : res.send("Nebyl vyplněn text");
    new_Comment.save(function(err, comment) {
        if (err) next(err);
        res.status(201).json(comment);
    });
};


exports.read = function (req, res, next) {
    Model.findById(req.params.itemid, function(err, comment) {
        if (err) next(err);
        res.status(200).json(comment);
    });
};

//res.json({ message: 'hooray! welcome to our api!' });

exports.update = function (req, res, next) {
    Model.findOneAndUpdate(req.params.commentId, req.body, {new: true}, function(err, comment) {
        if (err) next(err);
        res.status(201).json(comment);
    });
};


exports.delete = function (req, res, next) {

    Model.remove({
        _id: req.params.itemid
    }, function(err, Comment) {
        if (err) next(err);
        res.status(204).json(Comment);
    });
};
