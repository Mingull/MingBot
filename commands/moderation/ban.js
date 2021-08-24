const { Client, Message } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: [],
    category: "Moderation",
    description: "ban a member",
    usage: "",
    private: false,
    args: false,
    cooldown: 0,
    permissions: 'MANAGE_MESSAGES',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        message.channel.send("Test");
    }
}