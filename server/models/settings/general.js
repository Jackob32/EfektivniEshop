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
        default: 'general'
    },
    language: {
        type: String,
        required: false,
        default: 'cs'
    },
    currency: {
        type: String,
        required: true,
        default: 'Kč'
    },
    fee: {
        type: Number,
        required: true,
        default: 21
    },
    ordersCounter: {
        type: Number,
        required: false,
        default: 1
    }


});

module.exports = Schema;
