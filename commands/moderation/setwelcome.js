const { getConnection, getWelcomeChannels, setWelcomeChannels } = require("../../backend/functions")
module.exports = {
    name: 'setwelcome',
    aliases: ["sw"],
    category: "Moderation",
    description: "Sets the welcome channel",
    usage: "",
    private: false,
    args: false,
    cooldown: 0,
    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have the right permissions to execute this command");
        const { guild, channel } = message;

        const conn = await getConnection();
        if (!conn) return message.channel.send("could not connect to the database");


        conn.query(`UPDATE GuildConfigurable SET welcomeChannelId = '${channel.id}' WHERE guildId = '${guild.id}'`)
            .then(conn.query(`SELECT welcomeChannelId FROM GuildConfigurable WHERE guildId = '${guild.id}'`)
                .then(result => {
                    setWelcomeChannels(guild.id, result[0][0].welcomeChannelId)
                    console.log(getWelcomeChannels());
                })
                .catch(err => { throw err }))

        message.channel.send("welcome channel set");
    }
}