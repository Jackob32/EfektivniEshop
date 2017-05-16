/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';
let mongoose = require('mongoose');
/*
 {
 name: "item1ubiyy 7",
 description: 'popis produktu om',
 min_description: 'minp popis produktu omg',
 visible: true,
 count: 42,
 code: 'rxhnfyh'
 }
*/

function isObjectId(n) {
    return mongoose.Types.ObjectId.isValid(n);
}
/*

phone: {
    type: String,
        validate: {
        validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: '{VALUE} is not a valid phone number!'
    },
    required: [true, 'User phone number required']
}

*/

// mongoDB schema

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Jméno produktu je nutné vyplnit'],
        unique: [true,'Jméno produktu musí být unikátní!']
     //   unique:true
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
    visible: {
        type: Boolean,
        required: true,
        default: false
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    date: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
        required: true
    },
    count: {
        type: Number,
        default: 0,
        required: true,
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'category',
        validate: isObjectId
    }],
    code: {
        type: String,
    },
    pairprop : [{
        _id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Props',
            validate: isObjectId
            },
        value: mongoose.Schema.Types.Mixed
    }],
    related : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        validate: isObjectId
    }]
});

module.exports = Schema;

