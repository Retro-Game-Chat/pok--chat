// routes/server.js
var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

router.post('/user', userController.login);

module.exports = router;