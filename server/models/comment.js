/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';
let mongoose = require('mongoose');

function isObjectId(n) {
    return mongoose.Types.ObjectId.isValid(n);
}

// mongoDB schema
const Schema =  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        validate: isObjectId
    },
    text: {
        type: String,
        required: true
    },
    subject: String
});

module.exports = Schema;
