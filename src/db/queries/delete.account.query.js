async function deleteAccount(username){
    const deleteAcc = await sql`DELETE FROM account WHERE username='${username}' RETURNING *;`//param?
}
module.exports = deleteAccount