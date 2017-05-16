/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

// mongoDB schema
let mongoose = require('mongoose');
let validateName = function(name) {
    let re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    return re.test(name)
};
const Schema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true,'Jméno je požadováno'],
        validate: [validateName, 'Prosím vyplňte validní křestní jméno'],
    },
    lastname: {
        type: String,
        trim: true,
        required: [true,'Příjmení je požadováno'],
        validate: [validateName, 'Prosím vyplňte validní příjmení '],
    },
    phone: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: false
    },
    street: {
        type: String,
        required: false
    },
    number: {
        type: Number,
        required: false
    },
    zip: {
        type: String,
        required: false
    },
    ic: {
        type: String,
        required: false
    },
    ico: {
        type: String,
        required: false
    },
    dic: {
        type: String,
        required: false
    },
    same: {
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = Schema;
