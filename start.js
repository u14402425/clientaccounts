"use strict";
const express = require('express');
const dbInit = require('./Database');
const sqlite3 = require('sqlite3').verbose();
const dbQueries = require('./SQLQueries');

let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
});

db.serialize(() =>{
	
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (1,1, 'Cheque', 600.00)");
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (2,22, 'Savings', 1000.00)");
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (3,1, 'Cheque', 80.00)");
	db.run("INSERT INTO account (accountID, userID, accountType, currentBalance) VALUES (4,12, 'Debit', 600.00)");

});


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
 