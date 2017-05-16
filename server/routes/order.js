/**
 * Created by Jakub on 27.04.2017.
 */

'use strict';
module.exports = function(router) {
    var API = require('../controllers/order');
    router.route('/orders')
        .get(API.all)
        .post(API.create);
    router.route('/orders/:itemid')
        .get(API.read)
        .put(API.update)
        .delete(API.delete);
};
