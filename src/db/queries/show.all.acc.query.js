async function getAllFromAccount() {
    const result = await sql`select * from account`;
    console.log(result);
}
module.exports = getAllFromAccount
