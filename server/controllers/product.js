/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = require('./../models/product');

let Model = mongoose.model('Products', Schema);

let PropsSchema = require('./../models/prop');
let PropsModel = mongoose.model('Props', PropsSchema);
let ObjectID = require('mongodb').ObjectID;


exports.all = function (req, res, next) {
    Model.find({}, function (err, items) {
        if (err) next(err);
        res.status(200).json(items);
    });
};

exports.create = function (req, res, next) {

    if (!req.body.NewProps) {
        req.body.NewProps = [];
    }

    req.body.NewProps.forEach(function (pair, index) {
        req.body.NewProps[index]._id = new ObjectID();
    });

    PropsModel.create(req.body.NewProps, function (err, item) {
        if (err) {
            next(err);
        }
        else {
            if (!req.body.pairprop) {
                req.body.pairprop = [];

            }

            req.body.pairprop = req.body.pairprop.concat(req.body.NewProps);
            Model.create( req.body, function (err, item) {
                if (err) {
                    next(err);
                } else {
                    res.status(201).json(item);
                }
            });
        }
    });

};

exports.read = function (req, res, next) {
    Model.findOne({_id: req.params.itemid}).populate('Products').populate('pairprop._id').populate('Props').exec(function (err, item) {
        if (err) next(err);

        res.status(200).json(item);
    });
};

//res.json({ message: 'hooray! welcome to our api!' });



exports.update = function (req, res, next) {

    if (!req.body.NewProps) {
        req.body.NewProps = [];
    }

    req.body.NewProps.forEach(function (pair, index) {
        req.body.NewProps[index]._id = new ObjectID();
    });

    PropsModel.create(req.body.NewProps, function (err, item) {
        if (err) {
            next(err);
        }
        else {
            if (!req.body.pairprop) {
                req.body.pairprop = [];
            }
            req.body.pairprop = req.body.pairprop.concat(req.body.NewProps);
            Model.update({_id: req.params.itemid}, req.body, {upsert: true}, function (err, item) {
                if (err) {
                    next(err);
                } else {
                    res.status(201).json(item);
                }
            });
        }
    });

};

exports.delete = function (req, res, next) {
    Model.remove({
        _id: req.params.itemid
    }, function (err, item) {
        if (err) next(err);
        item.ok=true;
        item.deleted=true;

        res.status(204).json(item);

    });
};
