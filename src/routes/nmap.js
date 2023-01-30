const express = require('express')
const {exec} = require("child_process")
const { stdout } = require('process')
const execSh = require("exec-sh")
let router = express.Router()
const host = "8.8.8.8"
router.use(express.json())

router.route("/")
    .get((req, res)=>{
        
// run interactive bash shell
    execSh(`nmap ${host}`, (err) => {
        if (err) {
          console.log("Exit code: ", err.code);
          return;
        }
        // collect streams output
        // { cwd: "/home" },
        const child = execSh([`nmap ${host}`], true,
          (err, stdout, stderr) => {
            console.log("error: ", err);
            console.log("stdout: ", stdout);
            console.log("stderr: ", stderr);
            res.send(JSON.stringify(stdout))
        });
      });
    })

    .post((req, res)=>{
        
    })

router.route("/scan")
    .get((req, res)=>{
        execSh(`nmap ${host}`, (err) => {
            if (err) {
              console.log("Exit code: ", err.code);
              return;
            }
            // collect streams output
            // { cwd: "/home" },
            const child = execSh([`nmap ${host}`], true,
              (err, stdout, stderr) => {
                console.log("error: ", err);
                console.log("stdout: ", stdout);
                console.log("stderr dobiven: ", stderr);
                res.send(JSON.stringify(stdout))
            });
          });
        })
    .post((req, res)=>{
        exec(`nmap ${req.params}`, (error,stdout,stderr)=>{//port=req.params
            if(error){
               console.log(`${error}`)
               return
                }
                if(stderr){
                    console.log(`stderror: ${stderr}`)
                    return
                }
        })
        let string = JSON.stringify(stdout)
        console.log(string);
        res.send("/nmap Root hello" + "REZULTAT")//rezultat ubacit ode
    })

router.route("/vuln")//vuln(erability)
    .get((req,res)=>{
        //fill if needed
    })
    .post((req, res)=>{
        //fill if needed
    })

module.exports = router