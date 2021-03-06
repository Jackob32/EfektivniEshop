/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = require('./../models/order');

let Model = mongoose.model('Orders', Schema);

exports.all = function (req, res, next) {
    Model.find({}).populate('user').exec(function(err, items) {
        if (err) next(err);
        res.status(200).json(items);
    });
};

exports.create = function (req, res, next) {
    req.body.dateChanged=new Date();
   // Post.update({_id: req.body.postId}, {commentsId: {$push: comment._id}}

    if(!req.body.deliveryAddress ||
        !req.body.deliveryAddress.firstname  ||
        !req.body.deliveryAddress.lastname
    ){
        req.body.deliveryAddress.same=true;
    }

    if(req.body.deliveryAddress.same==true){
        req.body.deliveryAddress=req.body.billingAddress;
    }

    let item = new Model(req.body);
    item.save(function(err, item) {

        if (err) next(err);
        res.status(201).json(item);
    });
};


exports.read = function (req, res, next) {
    Model.findOne({ _id:req.params.itemid}).populate('paymentType').populate('transport').populate('user').exec(function(err, item) {
        if (err) next(err);

        res.status(200).json(item);
    });
};

//res.json({ message: 'hooray! welcome to our api!' });

exports.update = function (req, res, next) {

    req.body.dateChanged=new Date();

    if(!req.body.deliveryAddress ||
        !req.body.deliveryAddress.firstname  ||
        !req.body.deliveryAddress.lastname
    ){
        req.body.deliveryAddress.same=true;
    }


    if(req.body.deliveryAddress.same==true){
        req.body.deliveryAddress=req.body.billingAddress;
    }
    Model.update({_id: req.params.itemid}, req.body, {new: true}, function (err, item) {
        if (err) {next(err);
        }
        else {
            res.status(201).json(item);
        }
    });
};


exports.delete = function (req, res, next) {

    Model.remove({
        _id: req.params.itemid
    }, function(err, item) {
        if (err) next(err);
        item.ok=true;
        item.deleted=true;

        res.status(204).json(item);

    });
};