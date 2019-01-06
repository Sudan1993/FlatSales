var Agent = require('../models/agent');

const jwt = require('jsonwebtoken');

exports.agent_create = function (req, res) {
    console.log(req.body.agentname);
    var agent = new Agent(
        {
            agentname: req.body.agentname,
            //agentid: req.body.agentid,
            customer: req.body.customer
        }
    );

    agent.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send('agent Created successfully');
    })
};

exports.agent_lists = function(req, res){
    console.log("inside agent lists:::" + req.agentname);
    Agent.find({}, function(err, agents) {
        //console.log(agents);
        if(err) return next(err);
    var agentMap = {};

    agents.forEach(function(agent) {
      agentMap[agent.id] = agent;
    });
    //console.log(agentMap);
    res.send(agentMap);  
  });
};

exports.findById = function(agentid) {
    console.log("agentId" , agentid)
    return new Promise(function (resolve, reject) {
        Agent.findById(agentid,function (err, agent) {
            if (err) resolve(err);
            else{console.log("else agent" , agent); resolve(agent)};
        })
    });
};

exports.agent_details = function (req, res) {
    Agent.findById(req.params.id, function (err, agent) {
        if (err) res.send(err);
        res.send(agent);
    })
};

exports.agent_update = function (req, res) {
    Agent.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, agent) {
        if (err) return res.send(err);
        res.send('agent udpated.');
    });
};

exports.agent_delete = function (req, res) {
    Agent.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.send(err);
        res.send('Deleted successfully!');
    })
};