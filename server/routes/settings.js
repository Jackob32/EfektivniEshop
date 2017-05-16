/**
 * Created by Jakub on 27.04.2017.
 */
'use strict';
module.exports = function(router) {
    let API = require('../controllers/settings');
// Comments Routes
    router.route('/settings/:table')
        .get(API.all)
        .put(API.update);
};

