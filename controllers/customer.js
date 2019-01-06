var Customer = require('../models/customer');
var Agent = require('../controllers/agent');

exports.customer_create = function (req, res) {
    var agentid = req.body.agentid;
    //var agentname = req.body.agentname;
    //get the agent
    var agent = Agent.findById(agentid);
    //(Agent.findById(agentid)).then((agent,err)=>{
    agent.then((agent,err)=>{
        console.log("agent fom findById" , agent);
        if(err) res.send(err);
        else {
                var customer = new Customer(
                    {
                        //customerid: req.body.customerid,
                        customername: req.body.customername,
                        status: req.body.status,
                        customercontactno: req.body.customercontactno,
                        agent: agentid                
                    }
                );
                console.log("customer ===== ", customer);
                customer.save(function (err) {
                    if (err) {
                        return res.send(err);
                    }
                    agent.customers.push(customer);
                    agent.save(function(err){
                        if(err) res.sendStatus(403);
                        else res.send("customer created successfully");
                    })
            })
        }
        
    });    
    
};

exports.customers_list_all = function(req, res){
    var agentid = req.id;
    var agent = Agent.findById(agentid);
    agent.then((agent,err)=>{
        //res.send(typeof agent)
        if(agent["isadmin"]){
            Customer.find({}).
              exec(function (err, customers) {
                if (err) res.send(err);
                console.log(customers);
                res.send(customers);
              });
        }
        else{
            res.send("Agent doesnt have admin privileges");
        }
    })
};


exports.customers_list = function(req, res){
    //var agentid = req.id;
    Customer.find({}).populate('agent').
      exec(function (err, customers) {
        if (err) return handleError(err);
        console.log(customers);
        res.send(customers);
      });
}

exports.customer_details = function (req, res) {
    Customer.findById(req.params.id).populate('agent').
     exec(function (err, customer) {
        if (err) return err;
        res.send(customer);
    })
};

exports.customer_update = function (req, res) {
    Customer.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, customer) {
        if (err) return next(err);
        res.send('customer udpated.');
    });
};

exports.customer_delete = function (req, res) {
    Customer.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })  
};