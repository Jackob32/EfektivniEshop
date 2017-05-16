/**
 * Created by Jakub on 27.04.2017.
 */

'use strict';
module.exports = function(router) {
    var API = require('../controllers/payment');

    router.route('/payments')
        .get(API.all)
        .post(API.create);

    router.route('/payments/:itemid')
        .get(API.read)
        .put(API.update)
        .delete(API.delete);
};
