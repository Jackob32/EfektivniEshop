/**
 * Created by Jakub on 27.04.2017.
 */
'use strict';
module.exports = function(router) {
let API = require('../controllers/product');
    router.route('/products')
    .get(API.all)
    .post(API.create);
    router.route('/products/:itemid')
    .get(API.read)
    .put(API.update)
    .delete(API.delete);
};
