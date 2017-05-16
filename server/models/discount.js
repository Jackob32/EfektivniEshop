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
    targetid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        validate: isObjectId
    },
    target: {
        type: String,
        default: 'all',
        required: true,
        enum: ['product', 'category','all']
    },
    type: {
        type: String,
        default: 'all',
        required: true,
        enum: ['link', 'coupon','all']
    },
    validity: {
            from: {
                type: Date,
                default: Date.now,
                required: true
            },
            to: {
                type: Date,
                default: Date.now,
                required: true
            }
    },
    canStack: {
        //typ dopravy, nemel by se zkopirovat?
        type: Boolean,
        required: true,
        default: false
    },
    discount: {
        type: Number,
        required: true,
        min: 0
    },
    discountType: {
        type: String,
        default: 'all',
        required: true,
        enum: ['percent', 'number','gift','shipping']
    },
    limit: {
        type: Number,
        required: true,
        min: 1
    }
});

module.exports = Schema;
