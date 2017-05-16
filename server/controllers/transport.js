/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = require('./../models/transport');
let Model = mongoose.model('Transports', Schema);

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
    let item = new Model(req.body);
    item.save(function(err, item) {
        if (err){
            res.status(422).send(err);
        }else{
            res.json(item);
        }
    });
};


exports.read = function(req, res) {
    Model.findById(req.params.itemid, function(err, item) {
        if (err)
            res.status(422).send(err);
        res.json(item);
    });
};

//res.json({ message: 'hooray! welcome to our api!' });

exports.update = function(req, res) {
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
            res.status(422).send(err);
        } else {
            res.json(item);
        }
    });
}


};


exports.delete = function(req, res) {

    Model.remove({
        name: req.params.itemid
    }, function(err, item) {
        if (err){
            res.status(422).send(err);
        }
            else{
            item.ok=true;
            item.deleted=true;

            res.status(204).json(item);

        }
    });
};
