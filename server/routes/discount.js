/**
 * Created by Jakub on 27.04.2017.
 */

'use strict';
module.exports = function(router) {
    var API = require('../controllers/discount');

    router.route('/discounts')
        .get(API.all)
        .post(API.create);

    router.route('/discounts/:itemid')
        .get(API.read)
        .put(API.update)
        .delete(API.delete);
};
