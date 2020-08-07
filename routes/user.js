// routes/user.js

var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

router.post('/login', userController.login);
router.post('/sync', userController.sync);

module.exports = router;