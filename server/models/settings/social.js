/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

// mongoDB schema
let mongoose = require('mongoose');

function isObjectId(n) {
    return mongoose.Types.ObjectId.isValid(n);
}

const Schema = new mongoose.Schema({
    table:{
        type: String,
        required: true,
        default: 'social'
    },
    facebook:{
        type: String,
        required: false
    },
    instagram:{
        type: String,
        required: false
    },
    snapchat:{
        type: String,
        required: false
    },
    icq:{
        type: String,
        required: false
    },
    msn:{
        type: String,
        required: false
    },
    twitter:{
        type: String,
        required: false
    }
});

module.exports = Schema;
