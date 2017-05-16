/**
 * Created by Jakub on 27.04.2017.
 */
'use strict';
module.exports = function(router) {
var API = require('../controllers/user');
// Comments Routes
    router.route('/users')
    .get(API.all)
    .post(API.create);
//  .delete(ProductsAPI.delete_multi_Products)
//  .put(ProductsAPI.update_multi_Products);

    router.route('/users/:itemid')
    .get(API.read)
    .put(API.update)
    .delete(API.delete);
};
