var mongoose = require('mongoose');
var Customer = require('../models/customer');
var Schema = mongoose.Schema;

var AgentSchema = new Schema({
    //agentId: {type: Number, required: true},
    agentname: {type: String, require:true},
    customers: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Customer'
    }]
});


// Export the model
module.exports = mongoose.model('Agent', AgentSchema);