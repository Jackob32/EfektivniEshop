/**
 * Created by Jakub on 27.04.2017.
 */
'use strict';
module.exports = function(router) {
    var API = require('../controllers/comment');
// Comments Routes
    router.route('/comments')
        .get(API.all)
        .post(API.create);

    router.route('/comments/:itemid')
        .get(API.read)
        .put(API.update)
        .delete(API.delete);

};