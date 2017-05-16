/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';
var mongoose = require('mongoose');

var Schema = require('./../models/user');

let Model = mongoose.model('Users', Schema);


exports.all = function(req, res) {
    Model.find({}, function(err, items) {
        if (err) {
            res.status(422).send(err);
        }else{
            res.json(items);
        }
    });
};

exports.create = function(req, res) {

    req.body.firstname=req.body.address.firstname;
    req.body.lastname=req.body.address.lastname;
    var item = new Model(req.body);
    item.save(function(err, item) {
        if (err){
            res.status(422).send(err);
        }else{
            res.json(item);
        }
    });
};


exports.read = function(req, res) {
    Model.findOne({ _id:req.params.itemid}).populate('orders').populate('basket').exec(function(err, item) {
        if (err)
            res.status(422).send(err);

        res.json(item);
    });
};

//res.json({ message: 'hooray! welcome to our api!' });

exports.update = function(req, res) {


    req.body.firstname=req.body.address.firstname;
    req.body.lastname=req.body.address.lastname;


    Model.update({_id: req.params.itemid}, req.body, {upsert: true}, function (err, item) {
            if (err) {
                res.status(422).send(err);
            } else {
                res.json(item);
            }
        });
};


exports.delete = function(req, res) {

    Model.remove({
        _id: req.params.itemid
    }, function(err, item) {
        if (err){
            res.status(422).send(err);}
        else{
            item.ok=true;
            item.deleted=true;

            res.status(204).json(item);

        }
    });
};
