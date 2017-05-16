/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

let mongoose = require('mongoose');

exports.all = function (req, res, next) {
    let Model = mongoose.model(req.params.table, require('./../models/settings/'+req.params.table),'settings');
    Model.findOne({ 'table': req.params.table }, function(err, items) {
        if (err){
            next(err);
        }else{
            res.status(200).json(items);
        }
    });
};


exports.update = function (req, res, next) {
    let Model = mongoose.model(req.params.table, require('./../models/settings/'+req.params.table),'settings');

    Model.update({ table : req.params.table }, req.body, { upsert : true }, function(err, item) {
        if (err){
            next(err);
        }else{
            res.status(201).json(item);
        }
    });
};