/**
 * Created by Jakub on 27.04.2017.
 */
'use strict';
module.exports = function(router) {
let API = require('../controllers/stats');
    router.route('/stats/:typeID/:length')
    .get(API.all)
};
