// routes:
//     /masscan/basicSearch
//     /masscan/certainPortSearch
//     /masscan/networkBasicSearch
//     /masscan/networkCertainPortSearch
//     /masscan/lightspeed // extra brzo s --rate 20000000

const express = require('express')
const {exec} = require("child_process")
const { stdout } = require('process')
const execSh = require("exec-sh")
const jsonFile = require('../__data/test.json')
const Routes = require('twilio/dist/lib/rest/Routes')

let router = express.Router()

router.use(express.json())

router.route("/")
    .get((req, res)=>{
        res.send("Welcome to masscan!")
    })
    .post((req, res)=>{
        //fill if needed
    })

router.route("/basicSearch")//za poslat parametre ide samo post
    .get((req, res)=>{
    })
    .post((req, res)=>{
        execSh(`masscan ${req.params}`, (err) => {
            if (err) {
              console.log("Exit code: ", err.code);
              return;
            }
            // collect streams output
            // { cwd: "/home" },
            const child = execSh([`nmap ${req.params}`], true,
              (err, stdout, stderr) => {
                console.log("error: ", err);
                console.log("stdout: ", stdout);
                console.log("stderr: ", stderr);
                res.send(JSON.stringify(stdout))
            });
          });
        })
    


module.exports = router