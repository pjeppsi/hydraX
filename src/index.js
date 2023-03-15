const express = require('express')
const timeout = require('connect-timeout')
// const router = require("./routes/router")
const router = require("./routes/router2.js")

const sqlConnection = require('./db/db.connect.OG')
const port = 3001

const app = express()

app.use(router)
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.listen(port, () =>{
    console.log(`Listening on http://locahost:${port}`)
})


