/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';
var mongoose = require('mongoose');

// mongoDB schema
const Schema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = Schema;