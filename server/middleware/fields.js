/**
 * Created by Jakub on 25.04.2017.
 */
module.exports = function() {
    return function(req, res, next){
        if (!req.zdrojak) req.zdrojak = {};
        req.zdrojak.fields = {};
        if (req.query.fields) {
            req.query.fields.split(',').forEach(function(field){
                if (field.trim() !== '') {
                    req.zdrojak.fields[field] = 1;
                }
            });
        }
        next();
    }
};
