/**
 * Created by Jakub on 25.04.2017.
 */

module.exports = function() {
    return function(err, req, res, next){

        if (typeof(err) === 'number') {
            return res.send(err);
        }
        else if (err.name && err.name == 'ValidationError') {
            return res.status(400).send({
                type: 'ValidationError',
                message: err.message,
                errors: err.errors
            });
        }
        else if (!req.accepts('json')) {
            return res.status(400).send({
                type: 'Format is not supported',
                message: err.message,
                errors: err.errors,
                name: err.name
            });
        }
        else if (err.kind && err.kind == 'ObjectId') {
            return res.status(404).send({
                type: 'Does Not Exist',
                message: err.message,
                errors: err.errors,
                name: err.name
            });
        }


        else {
            //console.log("err  "+req.url);
           // console.error(err.stack);
            return res.status(400).send(err);
        }


    }
};
