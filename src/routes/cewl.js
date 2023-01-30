const express = require('express')
let router = express.Router()

router.use(express.json())

router.route("/")
    .get((req, res)=>{
        res.send("/cewl Root hello")
    })
    .post((req, res)=>{
        //fill if needed
    })

router.route("/")//za poslat parametre ide samo post
    .get((req, res)=>{
        res.send("/ hello")
    })
    .post((req, res)=>{
        //fill if needed
    })


module.exports = router