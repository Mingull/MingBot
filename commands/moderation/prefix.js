const { Client, Message } = require("discord.js");
const { getGuildCommandPrefixes, getConnection, setGuildCommandPrefix } = require("../../backend/functions");

module.exports = {
    name: "prefix",
    aliases: [""],
    category: "Moderation",
    description: "shows or sets the bot prefix for this guild",
    usages: '[new prefix]',
    args: false,
    cooldown: 0,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const prefix = getGuildCommandPrefixes(message.guild.id);
        const conn = await getConnection();
        if (args[0]) {
            if (message.member.id === message.guild.ownerID) {
                try {
                    conn.query(`UPDATE GuildConfigurable SET cmdPrefix = '${args[0]}' WHERE guildId = '${message.guild.id}'`);
                    setGuildCommandPrefix(message.guild.id, args[0]);
                    message.channel.send(`The prefix for this guild is now: \`${guildCommandPrefixes.get(message.guild.id)}\``)
                } catch (err) { console.error(err); }
            } else {
                message.channel.send('you do not have permission to execute this command')
            }
        } else {
            message.channel.send(`The prefix for this guild is: \`${prefix}\``)
        }
    }
}