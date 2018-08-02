var express = require('express');
var router = express.Router();
var product = require('./module/product')
var user = require('./module/user')
var base = require('./module/base')
router.use('/base', base)
router.use('/product', product)
router.use('/user', user)


module.exports = router;
