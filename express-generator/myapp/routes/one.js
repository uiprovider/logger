var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send('response with one');
});

module.exports = router;
