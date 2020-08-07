// routes/member.js

var express = require('express');
var router = express.Router();

var memberController = require('../controllers/member');

router.post('/', memberController.fetchAll);

module.exports = router;