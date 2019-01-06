var express = require('express');
var methods = require("../token_auth");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var agent_controller = require('../controllers/agent');

router.get('/getAllAgents',agent_controller.agent_lists);

router.post('/create',agent_controller.agent_create);

router.get('/:id', agent_controller.agent_details);

router.put('/:id/update', agent_controller.agent_update);

router.delete('/:id/delete', agent_controller.agent_delete);


module.exports = router;