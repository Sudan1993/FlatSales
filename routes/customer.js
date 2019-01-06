var express = require('express');
var methods = require("../token_auth");
var router = express.Router();

var customer_controller = require('../controllers/customer');

router.get('/getAllCustomers',customer_controller.customers_list);
// router.get('/entireCustomer', customer_controller.customers_list_all);

router.post('/create', customer_controller.customer_create);

router.get('/:id', customer_controller.customer_details);

router.put('/:id/update', customer_controller.customer_update);

router.delete('/:id/delete', customer_controller.customer_delete);

module.exports = router;