/**
 * Created by Jakub on 27.04.2017.
 */

'use strict';
module.exports = function(router) {
    let API = require('../controllers/category');
    router.route('/categories')
        .get(API.all)
        .put(API.update);
};
