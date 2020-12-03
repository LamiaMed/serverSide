const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    user:"root",
    host :"localhost",
    password:"123456789",
    database:"scrapeddata",
    insecureAuth : true,
});

module.exports = db;