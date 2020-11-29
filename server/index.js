const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    user:"root",
    host :"localhost",
    password:"123456789",
    database:"scrapeddata",
});

app.get("/submit",(req,res)=>{
 db.query(
     "SELECT NAME,WEBSITE FROM stratup",
     (err , result)=>{
         console.log(err);
     }
 );

});

app.listen(3001,()=>{
console.log('server running');
})