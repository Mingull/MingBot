module.exports = async (client, Discord) => {
    let connection = await require("../../database/db")
    try {
        await connection.query(`INSERT INTO Guilds VALUES ('${guild.id}', '${guild.ownerID}')`)
        await connection.query(`INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`)
    } catch (err) {
        console.error(err);
    }
}