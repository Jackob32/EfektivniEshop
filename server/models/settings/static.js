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
        default: 'design'
    },
    font:{
        type: String,
        required: true,
        default: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    templateUrl:{
            type: String,
            required: true,
            default: 'Eample Eshop'
    },
    headHtml: [{
        type: String,
        required: true,
        default: ''
    }],
    bodyHtml: {
        type: String,
        required: true,
        default: ''
    },
    mainLayout: {
        type: String,
        default: 'full',
        required: true,
        enum: ['full', 'left','right','simple']
    },
    productLayout: {
        type: String,
        default: 'full',
        required: true,
        enum: ['full', 'left','right','simple']
    },
    detailLayout: {
        type: String,
        default: 'full',
        required: true,
        enum: ['full', 'left','right','simple']
    },
    textColour: {
        type: String,
        required: false
    },
    backgoundColour: {
        type: String,
        required: false
    },
    colourH: {
        type: String,
        required: false
    },
    colourA: {
        type: String,
        required: false
    }
});

module.exports = Schema;
