/**
 * Created by Jakub on 23.04.2017.
 */
'use strict';

let mongoose = require('mongoose');

let moment = require('moment');

exports.all = function (req, res, next) {

    //2017-04-28 22:52:02.660
/*
    db.collection.aggregate([
        { "$group": {
            "_id": { "$dayOfYear": "$datetime" },
            "total": { "$sum": "$count" }
        }}
    ])*/
/*
 pipeline = [
 {"$project":
 {"date": {
 "year": {"$year": "$time"},
 "month": {"$month": "$time"},
 "day": {"$dayOfMonth": "$time"},
 "hour": {"$hour": "$time"},
 "minute": {"$subtract": [
 {"$minute": "$time"},
 {"$mod": [{"$minute": "$time"}, 10]}
 ]}
 }}
 },
 {"$group": {"_id": "$date", "count": {"$sum": 1}}}
 ]
 {$match: {$and: [{created_date: {$gte: start_date}}, {created_date: {$lte: end_date}}]}},

*/
    let today = moment().startOf('day');
    let month = moment(today).add(-req.params.length, 'days');
    today = moment(today).add(1, 'days');


    let Schema = require('./../models/product');
    let Model = mongoose.model('Products', Schema);
if(req.params.typeID=='Products'){
     Schema = require('./../models/product');
     Model = mongoose.model('Products', Schema);



Model.aggregate([
  /*  {$match: {$and: [{created_date: {$gte: month}}, {created_date: {$lte: today}}]}},*/
   {$match:
        { 'date':
                { "$gt": month.toDate(),"$lt": today.toDate() } } },

    { "$project": {
        "y":{"$year":"$date"},
        "m":{"$month":"$date"},
        "d":{"$dayOfMonth":"$date"},
        "date":"$date"
    }
    },
    { "$group": {
        "_id": { "year":"$y","month":"$m","day":"$d","hour":"$h"},
        date: {$max: '$date'} ,
        "total": { "$sum": 1 }
    } },
    { $sort: { date: 1 } },
])
   .exec(function (err, items) {
        if (err) {next(err);}
        else{
            let result={};
            result.items=items;
            result.ok=1;
        res.status(200).json(result);
        }
    });

}else if(req.params.typeID=='Users'){
    Schema = require('./../models/user');
    Model = mongoose.model('Users', Schema);


    Model.aggregate([
        /*  {$match: {$and: [{created_date: {$gte: month}}, {created_date: {$lte: today}}]}},*/
        {$match:
            { 'dateRegistration':
                { "$gt": month.toDate(),"$lt": today.toDate() } } },

        { "$project": {
            "y":{"$year":"$dateRegistration"},
            "m":{"$month":"$dateRegistration"},
            "d":{"$dayOfMonth":"$dateRegistration"},
            "date":"$dateRegistration"
        }
        },
        { "$group": {
            "_id": { "year":"$y","month":"$m","day":"$d","hour":"$h"},
            date: {$max: '$date'} ,
            "total": { "$sum": 1 }
        } },
        { $sort: { date: 1 } },
    ])
        .exec(function (err, items) {
            if (err) {next(err);}
            else{
                let result={};
                result.items=items;
                result.ok=1;
                res.status(200).json(result);
            }
        });


}else if(req.params.typeID=='Orders'){
    Schema = require('./../models/order');
    Model = mongoose.model('Orders', Schema);

    Model.aggregate([
        /*  {$match: {$and: [{created_date: {$gte: month}}, {created_date: {$lte: today}}]}},*/
        {$match:
            { 'dateCreated':
                { "$gt": month.toDate(),"$lt": today.toDate() } } },

        { "$project": {
            "y":{"$year":"$dateCreated"},
            "m":{"$month":"$dateCreated"},
            "d":{"$dayOfMonth":"$dateCreated"},
            "date":"$dateCreated"
        }
        },
        { "$group": {
            "_id": { "year":"$y","month":"$m","day":"$d","hour":"$h"},
            date: {$max: '$date'} ,
            "total": { "$sum": 1 }
        } },
        { $sort: { date: 1 } },
    ])
        .exec(function (err, items) {
            if (err) {next(err);}
            else{
                let result={};
                result.items=items;
                result.ok=1;
                res.status(200).json(result);
            }
        });


}

};

