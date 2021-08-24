module.exports = {
    name: 'simjoin',
    aliases: ["sj"],
    category: "Moderation",
    description: "Sets the welcome channel",
    usage: "",
    private: false,
    args: false,
    cooldown: 0,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (message.member.hasPermission("ADMINISTRATOR")) client.emit('GuildMemberMessageAdd', message.member);
    }
}