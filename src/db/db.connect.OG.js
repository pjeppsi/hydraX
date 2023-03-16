const deleteAcc = require('./queries/delete.account.query')
const showAccounts = require('./queries/show.all.acc.query')
const addAcc = require('./queries/add.account.query')
const postgres = require('postgres');

require('dotenv').config();


const URL = `postgres://petarcelar7:WZQHnrVC2kI7@ep-tight-night-820122.eu-central-1.aws.neon.tech/neondb?options=project%3Dep-tight-night-820122`
const sqlConnection = postgres(URL, { ssl: 'require' });

module.exports = sqlConnection;

