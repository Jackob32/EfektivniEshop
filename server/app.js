/**
 * Created by Jakub on 25.04.2017.
 */
const MAIN_PATH='./';

let express = require('express');
let config = require(MAIN_PATH+'config');

console.log('create app');
const app = express();
//config app7
console.log('config app');
config.configure(app);
console.log('connect db');

//connect mongoose to the app
config.connect(app);
console.log('route');
let router = express.Router()

app.use('/api', router);


let categoryRoutes = require('./routes/category');
categoryRoutes(router);

let commentRoutes = require('./routes/comment');
commentRoutes(router);

let discountRoutes = require('./routes/discount');
discountRoutes(router);

let orderRoutes = require('./routes/order');
orderRoutes(router);

let productRoutes = require('./routes/product');
productRoutes(router);

let propRoutes = require('./routes/prop');
propRoutes(router);

let transportRoutes = require('./routes/transport');
transportRoutes(router);

let userRoutes = require('./routes/user');
userRoutes(router);

let basicSettingsRoutes = require('./routes/settings');
basicSettingsRoutes(router);

let paymentRoutes = require('./routes/payment');
paymentRoutes(router);

let statestRoutes = require('./routes/state');
statestRoutes(router);

let statsRoutes = require('./routes/stats');
statsRoutes(router);

app.use(require('./middleware/error')());

module.exports = app;