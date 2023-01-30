const express = require('express')
let router = express.Router()

router.use(express.json())

router.route("/")
    .get((req, res)=>{
        res.send("Hydra Root hello")
    })
    .post((req, res)=>{
        //fill if needed
    })

router.route("/bruteforce")//za poslat parametre ide samo post
    .get((req, res)=>{
        res.send("")
    })
    .post((req, res)=>{
        //fill if needed
    })


module.exports = router