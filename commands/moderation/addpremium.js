const { Message, Client } = require("discord.js");
const { getConnection } = require("../../backend/functions");

module.exports = {
    name: "addpremium",
    aliases: ["ap"],
    category: "Moderation",
    description: "add a reaction role",
    usage: "<channel id>",
    private: false,
    args: false,
    cooldown: 0,
    permissions: 'MANAGE_MESSAGES',
    /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (message.author.id !== '149233694253645824') return;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply('Please specify a valid member');

        const conn = await getConnection();
        const results = await conn.query(`SELECT * FROM MemberPremium WHERE MemberId = ${member.id}`)
        if (!results[0].length == 0 || !results[0][0] == undefined) {
            return console.log('there is data', results[0][0])
            if (results[0][0].memberId === member.id) return message.reply("This user already obtained **PREMIUM**")
        }
    }
}