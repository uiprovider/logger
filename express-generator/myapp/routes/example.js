'use strict';
var AMI = require('./ami');
var util = require('util');
var express = require('express');
var router = express.Router();

var mysql = require('mysql')

const app = express()
// var MongoClient = require('mongodb').MongoClient

var ami = new AMI({
  port: 5038,
  host: '192.168.10.244',
  login: 'dev',
  password: 'dev@123',
  events: true
});


var con = mysql.createConnection({
  host: "192.168.10.244",
  user: "root",
  password: "etpl123",
  database: "conference"
});



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// function print_res (res) {
//   util.log('response to action: ' + util.inspect(res));
// }

// ami.connect(function () {
//   ami.send({Action: 'Command', Command: 'core show uptime'}, print_res);
//   util.log('connected to AMI version ' + ami.version);
// });

// ami.on('error', function (e) {
//   util.log('Fatal error: ' + e);
//   process.exit(255);
// });

// ami.on('FullyBooted', function () {
//   ami.send({
//     Action: 'Command',
//     Command: 'database show'
//   }, print_res);
//   ami.send({Action: 'SIPpeers'}, print_res);
//   ami.on('event', function (ev) {
//     util.log('got event ' + ev.Event);
//   });
// });

router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  function print_res (res) {
    util.log('response to action: ' + util.inspect(res));
  }
  
  ami.connect(function () {
    ami.send({Action: 'Command', Command: 'core show uptime'}, print_res);
    util.log('connected to AMI version ' + ami.version);
  });
  
  ami.on('error', function (e) {
    util.log('Fatal error: ' + e);
    process.exit(255);
  });
  
  ami.on('FullyBooted', function () {
    ami.send({
      Action: 'Command',
      Command: 'database show'
    }, print_res);
    ami.send({Action: 'SIPpeers'}, print_res);
    ami.on('MeetmeTalking', function (ev) {
      util.log('got event ' + ev.Event);
      // res.send(ev.Event);
     //res.write(ev.Event + '\n');
      // con.connect(function(err) {
        // if (err) throw err;
        // console.log("Connected!");




var Event_Status =[[ev.Status]];
var Channel =[[ev.Channel]];
console.log(Channel);
console.log(Event_Status);
var sql = "update con_calls set Event_Status=? where Channel=?";
var query = con.query(sql, [Event_Status,Channel], function(err, result) {
});



      // con.end();
    });
  });

  // res.send('respond with a resource');

});

module.exports = router;
