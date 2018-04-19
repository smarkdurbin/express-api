var express = require('express');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('\nAPI request made');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET API root */
router.get('/', function(req, res) {
    res.json({message: 'Welcome to the API root'});
});

module.exports = router;