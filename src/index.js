const express = require('express')
const timeout = require('connect-timeout')

const nmap = require("./routes/nmap")
const cewl = require('./routes/cewl')
const masscan = require("./routes/masscan")
const sherlock = require("./routes/sherlock")
const port = 3001


const app = express()
const router = express.Router()

app.use("/nmap", nmap)
app.use("/cewl", cewl)
app.use("/masscan", masscan)
app.use("/sherlock", sherlock)

app.use(timeout(90000))
router.use(express.json());

app.listen(port, () =>{
    console.log(`Listening on ${port}`)
})

app.get('/', (req, res)=>{
    res.send("Root, hello")
})
