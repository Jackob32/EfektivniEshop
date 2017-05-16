/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';
let mongoose = require('mongoose');


/*
 var ReplySchema = new Schema({
 nickName: { type: String, unique: true, required: true },
 content: String
 }, { _id: true });

 ReplySchema.add({ replies: [ReplySchema] });


*/
var Schema = new mongoose.Schema();

// mongoDB schema

Schema.add({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    children  : [Schema]
});

module.exports = Schema;
