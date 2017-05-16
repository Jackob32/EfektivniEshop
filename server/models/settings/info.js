/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

// mongoDB schema
let mongoose = require('mongoose');
let address = require('./../address');


function isObjectId(n) {
    return mongoose.Types.ObjectId.isValid(n);
}

const Schema = new mongoose.Schema({
    table:{
        type: String,
        required: true,
        default: 'info'
    },
    address: address,
    nameEshop:{
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        validate: isObjectId
    }],
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} není validní číslo!'
        },
        required: [true, 'Telefon je povinný parametr']
    },
    mobilePhone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} není validní číslo!'
        },
        required: [true, 'Mobilní Telefon je povinný parametr']
    },
    description: {
        type: String,
        required: false
    },
    bankAccount: {
        type: Number,
        required: true
    },
    bankCode: {
        type: Number,
        required: true
    },
    creditCardInfo: {
        type: String,
        required: false
    }
});

module.exports = Schema;
