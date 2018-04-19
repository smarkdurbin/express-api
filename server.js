// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// use morgan to log requests to the console
app.use(morgan('dev'));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working
router.get('/', function(req, res) {
    res.json({ message: 'API is located at /api/' });   
});

// keep routers for API separate from other stuff
var apiRouter = require('./routes/api');
var widgetsApiRouter = require('./routes/api/widgets');

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);
app.use('/api/', apiRouter);
app.use('/api/widgets', widgetsApiRouter);

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/dev';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// START THE SERVER
// =============================================================================
app.listen(port);

console.log('\nThe hatches are open on ' + port + '\n');