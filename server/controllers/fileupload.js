/**
 * Created by Jakub on 25.04.2017.
 */

let formidable = require('formidable'),
    http = require('http'),
    util = require('util');

/*

priklad
form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
});
*/
/*
 //let form = new formidable.IncomingForm();
app.get('/file-upload/:year/:month',
    function(req,res){

 let now=new Date();
 let year=now.getYear();
 let month=now.getMonth();
 let day=now.getDay();

 let form=new formidable.IncomingForm();
        form.parse(req,function(err, fields,file){
            if(err)
                return res.redirect(303, '/error');
                console.log('Recieved File');
                console.log(file);
            return res.redirect(303, '/thankyou');
            }
        )

});
 */