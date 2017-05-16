/**
 * Created by Jakub on 27.04.2017.
 */
/**
 * Created by Jakub on 27.04.2017.
 */
'use strict';
module.exports = function(router) {
    var API = require('../controllers/prop');
// Comments Routes
    router.route('/props')
        .get(API.all)
        .post(API.create);

    router.route('/props/:itemid')
        .get(API.read)
        .put(API.update)
        .delete(API.delete);
};