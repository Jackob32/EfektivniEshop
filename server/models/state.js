/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';
let mongoose = require('mongoose');

function isObjectId(n) {
    return mongoose.Types.ObjectId.isValid(n);
}

// mongoDB schema
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = Schema;
