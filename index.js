"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const dbInit = require('./Database');
const sqlite3 = require('sqlite3').verbose();
const dbQueries = require('./SQLQueries');
const queries = new dbQueries;
var app = express();

//Setting up server
 var server = app.listen(process.env.PORT || 8081, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

/**
Opening databse
**/

let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
});


app.post('/searchUserID', function(req, res, next) {
  queries.getEntry(req.body.userId,function(amount){

    res.json(amount);
  });
});

app.post('/create', function (req, res, next) {
    console.log('request received:', req.body.userID);
      queries.createAccount(req.body.userID,function(amount){
     res.json({create: amount});
  });
});

app.post('/accountID', function(req, res, next) {
    console.log('recieved');
      queries.selectBalance(req.body.AccountId,function(amount){
        console.log(req.body.AccountId);
        res.json({amt: amount})
      });
      
        //console.log(res.json({smt : statement}));
});

app.post('/statement', function(req, res, next) {
    console.log("its in");
    console.log(req.body.AccountId);
    queries.printMini(req.body.AccountId, function(statement){
        console.log(statement);
    res.json(statement);
  });
});

app.post('/withdraw', function (req, res, next) {
    console.log('request received:', req.body.userID +" and "+ req.body.amount);
      queries.withdraw(req.body.userID, req.body.amount,function(amount){
    res.json({amt : amount});
  });
});

app.post('/deposit', function (req, res, next) {
    console.log('request received:', req.body.userID +" and "+ req.body.amount);
      queries.deposit(req.body.userID, req.body.amount,function(amount){
    res.json({amt : amount});
  });
});

app.post('/delete', function (req, res, next) {
    console.log('request received:', req.body.userID);
    queries.deactivateUser(req.body.userID,function(amount){
        res.send({msg : amount});
      });
});

/**
API
**/

//create new account, using given userID/clientID, balance = 0
app.post('/create/:userID', function (req, res) {
  queries.createAccount(req.params.userID,function(amount){
  	res.end(amount);
  });
});

//create new account, using given userID/clientID, balance = amount(2nd parameter)
app.post('/createWDepo/:userID/:amount', function (req, res) {
  queries.createAccount(req.params.userID, req.params.amount,function(amount){
  	res.end(amount);
  });
});

//get current balance, given accountID
app.get('/balance/:accountID', function (req, res) {
  queries.selectBalance(req.params.accountID,function(amount){
  	res.end(JSON.stringify((amount)));
  });
});

//get account, given accountID
app.get('/accountType/:accountID', function (req, res) {
  queries.selectAccountType(req.params.accountID,function(amount){
  	res.send(amount);
  });
});

//get all accounts that belong to certain user, given userID
app.get('/getAccounts/:userID', function (req, res) {
  queries.getAccounts(req.params.userID,function(amount){
  	res.send(amount);
  });

});

//retrieve all details (*) on all accounts of a certain user, given userID
app.get('/getEntry/:userID', function (req, res) {
  queries.getEntry(req.params.userID,function(amount){
  	res.send(amount);
  });
});

//retrieve all details (*) of accounts table
app.get('/getEntries', function (req, res) {
  queries.getEntries(function(amount){
  	res.send(amount);
  });
});

//retrieve all details (*) of log table
app.get('/getLogEntries', function (req, res) {
  queries.getLogEntries(function(amount){
  	res.send(amount);
  });
});

//retrieve all details (*) of log table, given accountID
app.get('/getLogEntry/:accID', function (req, res) {
  queries.getLogEntry(req.params.accID, function(amount){
  	res.send(amount);
  });
});

//retrieve last 6 transactions of particular account, given accountID
app.get('/printMini/:accID', function (req, res) {
  queries.printMini(req.params.accID, function(amount){
  	res.send(amount);
  });
});


//set 'active' column to deactivated, given userID
app.put('/deactivate/:userID', function (req, res) {
  queries.deactivateUser(req.params.userID,function(amount){
  	res.send(amount);
  });
});

//set 'active' column to active, given userID
app.put('/activate/:userID', function (req, res) {
  queries.activateUser(req.params.userID,function(amount){
  	res.send(amount);
  });
});

//perform deposit transaction, given account Id and deposit amount
app.put('/deposit/:accID/:amount', function (req, res) {
  queries.deposit(req.params.accID, req.params.amount,function(amount){
  	res.send(amount);
  });
});

//perform withdrawal transaction, given account Id and deposit amount
app.put('/withdraw/:accID/:amount', function (req, res) {
  queries.withdraw(req.params.accID, req.params.amount,function(amount){
  	res.send(amount);
  });
});

 
