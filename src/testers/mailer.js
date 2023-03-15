var nodemailer = require('nodemailer')
let file = require('../__data/hydra-result.json')

let results=file.results

var transport = nodemailer.createTransport({
    service: 'outlook',
    auth:{
        user: 'pcelar00@fesb.hr',
        pass: ''//in .env!
    }
})
const stringResults = JSON.stringify(results)
var mailContent = {
    from: 'pcelar00@fesb.hr',
    to: 'petarcelar7@gmail.com',
    subject: 'HydraX scan results',
    text: `${stringResults}`,
}

transport.sendMail(mailContent, function(error,info){
    if(error){
        console.log(error)
    }
    else{
        console.log('Email sent' + info.response)
    }
})


