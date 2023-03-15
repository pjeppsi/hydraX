async function addAccount(username, password) {
    const addAcc = await sql`INSERT INTO account(username, passw) VALUES ('${username}', '${password}');`//params?
}

module.exports = addAccount