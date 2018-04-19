var express = require('express');
var router = express.Router();

// include Widget model
var Widget = require('../../models/Widget');

/* GET API docs */
router.get('/docs', function(req, res, next) {
    res.json({
        endpoints: [{
            index: {
                url: "/doc",
                request_type: "GET",
                description: "Returns API details",
            }
        }, {
            list: {
                url: "/list/",
                request_type: "GET",
                description: "Returns list all items in collection WIDGETS",
            }
        }]
    });
});

/* GET - READ - List all items in collection WIDGETS */
router.get('/', function(req, res) {
    Widget.find(function(err, widgets) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(widgets);
        }
    });
});

/* POST - CREATE - Create single item in collection WIDGETS */
router.post('/', function(req, res) {
    var widget = new Widget(); // create a new instance of the Widget model
    widget.title = req.body.title; // set the widget title (comes from the request)

    // save the widget and check for errors
    widget.save(function(err) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: 'Widget created!' });
        }
    });

});

/* GET - READ - Fetch single item from collection WIDGETS */
router.get('/:widget_id', function(req, res) {

    Widget.findById(req.params.widget_id, function(err, widget) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(widget);
        }
    });

});

/* PUT - UPDATE - Fetch single item from collection WIDGETS */
router.put('/:widget_id',function(req, res) {

    // use our bear model to find the bear we want
    Widget.findById(req.params.widget_id, function(err, widget) {

        if (err) {
            res.send(err);
        } else {
            widget.title = req.body.title; // update the bears info

            // save the bear
            widget.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'Widget updated!' });
                }
            });
        }

    });
});

/* DELETE - DELETE - Delete single item from collection WIDGETS */
router.delete('/:widget_id',function(req, res) {
    Widget.remove({
        _id: req.params.widget_id
    }, function(err, widget) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Widget successfully deleted' });
        }

    });
});

module.exports = router;
