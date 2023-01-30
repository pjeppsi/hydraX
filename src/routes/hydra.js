const express = require('express')
let router = express.Router()

router.use(express.json())

router.route("/")
    .get((req, res)=>{
        res.send("hydraX")
    })
    .post((req, res)=>{
        //fill if needed
    })

router.route("/ssh")//za poslat parametre ide samo post
    .get((req, res)=>{
        res.send("")
    })
    .post((req, res)=>{
        //fill if needed
    })

    router.route("/form")//za poslat parametre ide samo post
    .get((req, res)=>{
        res.send("")
    })
    .post((req, res)=>{
        //fill if needed
    })

module.exports = router