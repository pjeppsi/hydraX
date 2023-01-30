const express = require('express')
const {exec} = require("child_process")
const { stdout } = require('process')
const execSh = require("exec-sh")
const jsonFile = require('../__data/test.json')
const Routes = require('twilio/dist/lib/rest/Routes')
const commandPathSherlock = '/home/pjepsi/Documents/h4ck/tools/OSINT/sherlock/sherlock/sherlock.py'

let router = express.Router()

router.use(express.json())

router.route("/")
    .get((req, res)=>{
        res.send("Welcome to sherlock!")
    })
    .post((req, res)=>{
        //fill if needed
    })

router.route("/search")//za poslat parametre ide samo post
    .get((req, res)=>{
        console.log("Zapocinjem sherlock naredbu")
        execSh(`python3 ${commandPathSherlock} pjepsi`, (err) => {
            if (err) {
              console.log("Exit code: ", err.code);
              return;
            }
            // collect streams output
            // { cwd: "/home" },
            const child = execSh([`python3 ${commandPathSherlock} pjepsi`], true,
              (err, stdout, stderr) => {
                console.log("error: ", err);
                console.log("stdout: ", stdout);
                console.log("stderr: ", stderr);
                res.send(JSON.stringify(stdout))
            });
          });
        })
    
    .post((req, res)=>{
        console.log("Zapocinjem sherlock naredbu")
        execSh(`python3 ${commandPathSherlock} pjepsi`, (err) => {
            if (err) {
              console.log("Exit code: ", err.code);
              return;
            }
            // collect streams output
            // { cwd: "/home" },
            const child = execSh([`python3 ${commandPathSherlock} pjepsi`], true,
              (err, stdout, stderr) => {
                console.log("error: ", err);
                console.log("stdout: ", stdout);
                console.log("stderr: ", stderr);
                res.send(JSON.stringify(stdout))
            });
          });
        })
    


module.exports = router