/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';
let mongoose = require('mongoose');

// mongoDB schema
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    measurement: {
        type: String,
        required: false
    },
    help: {
        type: String,
        required: false
    }
});

module.exports = Schema;

