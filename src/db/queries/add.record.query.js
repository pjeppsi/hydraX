const sqlConnection = require("../db.connect.OG")

async function addResult(){
    const addResultRecord = await sqlConnection(`INSERT INTO account(username, passw) VALUES ('${username}', '${password}'`);
}