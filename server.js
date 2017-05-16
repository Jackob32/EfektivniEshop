//main application
let app = require('./server/app');
//start listening on port
app.listen(process.env.PORT || 3001, function(){
    console.log("Express server is listening on port %d in %s mode", this.address().port, app.settings.env);
});