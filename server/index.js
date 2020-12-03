const express = require("express");
const mysql = require("mysql");
const db = require("./config/db");
const app = express();
const bodyParser = require('body-parser');




db.connect(function (err) {
   if (err) { throw err }
   else { console.log("connected!"); }

})
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept, Authorization");
   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,PATCH,DELETE');
      return res.status(200).json({});
   }
   next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get("/api/startups", (req, res) => {
   var remote=req.query.remote;
   var source=req.query.source;
   var contrat=req.query.contrat;
   var tech=req.query.tech;
   console.log('remote',remote)
   var q="select name,website from startup where idstartup in (select startupID from offre where contrat like '%"+contrat+"%' and travail like '%"+remote+"%' and (description like '%"+tech+"%' or skills like '%"+tech+"%')) and sourceID="+source;
   db.query(
      q,
      function (err, result) {
         if (err) {
            console.log("error", err)
         } else {
            console.log('startups ', result)
            res.json(result);
         }
      }
   )
 


})
app.get("/api/AllStartups", (req, res) => {
  
  
   var q="select name,website from startup";
   db.query(
      q,
      function (err, result) {
         if (err) {
            console.log("error", err)
         } else {
            console.log('startups ', result)
            res.json(result);
         }
      }
   )
 


})

app.get("/api/Alloffres/:startupname", (req, res) => {
   db.query(
      "SELECT poste, salaire, travail, skills, contrat, diplome, experience, description FROM offre where startupID in (select idstartup from startup where name=?)", req.params.startupname, function (err, answer) {
         if (err) {
            console.log("error", err);

         } else {
            res.json(answer);
            console.log(answer)

         }
      }
   );

});

app.listen(3003, () => {
   console.log('server running');
})