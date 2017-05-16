/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

let mongoose = require('mongoose');
let Schema = require('./../models/category');
let Model = mongoose.model('Category', Schema);

exports.all = function (req, res, next) {
    Model.findOne({ 'title': "kategorie" }, function(err, item) {
        if (err) {
            if (err) next(err);
        }else{

            if (item == null) {
                let kategorie = {
                    title: "kategorie",
                    children: []
                }
                Model.update({title: "kategorie"}, kategorie, {new: true, upsert: true}, function (err, item) {
                    if (err)
                        next(err);
                    res.status(201).json(item);
                });
            } else {
                res.status(200).json(item.children);
            }
        }
    });
};


//res.json({ message: 'hooray! welcome to our api!' });

exports.update = function(req, res) {
    let item = {title:"kategorie", children: req.body};
    Model.update({ title: "kategorie" }, item, {new: true, upsert : true}, function(err, item) {
        if (err)
            next(err);
        res.status(201).json(item);
    });
};
