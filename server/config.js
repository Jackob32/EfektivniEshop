/**
 * Created by Jakub on 25.04.2017.
 */
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let router = express.Router()

exports.configure = function (app) {
    app.set('port', (process.env.PORT || 3001));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
    } else {
        app.use(express.static(process.cwd() + './public'));
    }
    app.use('/api', router);
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        //and remove cacheing so we get the most recent comments
        res.setHeader('Cache-Control', 'no-cache');
        next();
    });

    if (process.env.NODE_ENV === 'production') {
        app.set('db uri', 'mongodb://heroku_hqzgd49g:vvtdjfb6bc3tueomj8vnv8hsn6@ds139761.mlab.com:39761/heroku_hqzgd49g');
        console.log('mongodb://heroku_hqzgd49g:vvtdjfb6bc3tueomj8vnv8hsn6@ds139761.mlab.com:39761/heroku_hqzgd49g');
    } else {
        app.set('db uri', 'mongodb://localhost/efectiveeshop');
    }
};

exports.connect = function (app) {
    mongoose.Promise = global.Promise;
    try {
        mongoose.connect(app.get('db uri'));
        console.log('connecting to mongoDB');
    } catch (e) {
        console.log('ERROR: could not connect to mongoDB. Is it running? (use `mongod`)');
        process.exit(1);
    }
};