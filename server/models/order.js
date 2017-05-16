/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';
let mongoose = require('mongoose');
let product = require('./product');
let comment = require('./comment');
let address = require('./address');

function isObjectId(n) {
    return mongoose.Types.ObjectId.isValid(n);
}

// mongoDB schema
const Schema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    payed : {
        type: Boolean,
        required: true,
        default: false
    },
    sent : {
        type: Boolean,
        required: true,
        default: false
    },
    note: {
        type: String,
        required: false
        //    ,unique: true
    },
    products: [{
        name: {
            type: String,
            required: true,
        },
        image: {
            data: mongoose.Schema.Types.Buffer,
            contentType: String
        },
        description: {
            type: String,
            required: false
        },
        min_description: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            default: 0,
            required: true,
            min: 0
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        number: {
            type: Number,
            default: 1,
            required: true,
            min: 1
        },
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'category',
            validate: isObjectId
        }],
        code: {
            type: String,
            required: false
        },
        pairprop: [{
            prop: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Props',
                validate: isObjectId
            },
            value: mongoose.Schema.Types.Mixed
        }]
    }],
    transport: {
        //typ dopravy, nemel by se zkopirovat?
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transports',
        validate: isObjectId
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        validate: isObjectId,
        ref: 'Users',
    },
    deliveryAddress: address,
    billingAddress: address,
    dateCreated: {
        type: Date,
        default: Date.now,
        required: false
    },
    dateChanged: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateSent: {
        type: Date,
        default: 0,
        required: false
    },
    price: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    status: {
        type : mongoose.Schema.Types.ObjectId,
        value: String,
        ref: 'Statuses',
        validate: isObjectId
    },
    variablecode : {
        type: String,
        required: false
    },
    constantcode : {
        type: String,
        required: false
    },
    specificcode : {
        type: String,
        required: false
    }
    ,  comments : [comment]
});

module.exports = Schema;
