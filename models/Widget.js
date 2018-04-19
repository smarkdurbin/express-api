//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
    title: String,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Widget', WidgetSchema );