var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Agent = require('../models/agent');

var CustomerSchema = new Schema({
    //customerId: {type: Number, required: true},
    customername: {type: String, required:true},
    status: {type: String , default:"Created"},
    customercontactno: {type: Number ,required:true},
    agent: {
    	type : mongoose.Schema.Types.ObjectId,
    	ref: 'Agent'
    }
});


// Export the model
module.exports = mongoose.model('Customer', CustomerSchema);