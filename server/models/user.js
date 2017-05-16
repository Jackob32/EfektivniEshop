/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';
let mongoose = require('mongoose');
let order = require('./order');
let product = require('./product');
let address = require('./address');

function isObjectId(n) {
    return mongoose.Types.ObjectId.isValid(n);
}

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


// mongoDB schema
const Schema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true,'Email je požadován'],
        validate: [validateEmail, 'Prosím vyplňte validní emailovou adresu.'],
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'customer',
        enum: ['customer', 'admin','seller','carrier']
    },
    dateRegistration: {
        type: Date,
        default: Date.now,
        required: true
    },
    newsletter: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
        required: true,
    },
    creditCardInfo: {
        type: String,
    },
    address: address,
    basket : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        validate: isObjectId
    }],
    orders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        validate: isObjectId
    }]
});

module.exports = Schema;












