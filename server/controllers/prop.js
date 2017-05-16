/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = require('./../models/prop');

let Model = mongoose.model('Props', Schema);


exports.all = function (req, res, next) {
    Model.find({}, function(err, items) {
        if (err) {
            if (err) next(err);
        }else{
            res.status(200).json(items);
        }
    });
};

exports.create = function (req, res, next) {
    let item = new Model(req.body);
    item.save(function(err, item) {
        if (err){
            if (err) next(err);
        }else{
            res.status(201).json(item);
        }
    });
};


exports.read = function (req, res, next) {
    Model.findById(req.params.itemid, function(err, item) {
        if (err) next(err);
        res.status(200).json(item);
    });
};

//res.json({ message: 'hooray! welcome to our api!' });

exports.update = function (req, res, next) {
    if(req.params.itemid!=null) {
        Model.update({_id: req.params.itemid}, req.body, {upsert: true}, function (err, item) {
            if (err) {
                res.send(err);
            } else {
                res.json(item);
            }
        });
    }else{
        Model.update({name: req.body.name}, req.body, {upsert: true}, function (err, item) {
            if (err) {
                if (err) next(err);
            } else {
                res.status(201).json(item);
            }
        });
    }


};


exports.delete = function (req, res, next) {

    Model.remove({
        name: req.params.itemid,
    }, function(err, item) {
        if (err){
            if (err) next(err);
        }
        else{
            item.ok=true;
            item.deleted=true;

            res.status(204).json(item);


        }
    });
};