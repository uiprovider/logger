var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;


// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/karthi_mongo_dbms',['employee']);

// var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function() {
  console.log('Connected');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.send('respond with a resource');
  db.employee.findOne(function(err, tasks){
    if(err){
      res.send(err);
    }
    else{
      res.json(employee)
    }
  });
});


module.exports = router;
