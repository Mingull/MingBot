const { MessageEmbed } = require("discord.js");
const { getConnection, getMember } = require("../../backend/functions");

module.exports = {
    name: "leaderboard",
    aliases: ["lb"],
    category: "General",
    description: "Shows the leaderboard from the guild",
    args: false,
    run: async (client, message, args) => {
        const conn = await getConnection();
        const embed = new MessageEmbed()
            .setTitle(`${message.guild}'s Leaderboard`)
            .setDescription(`If you want to see the whole [[leaderboard](http://localhost:3000/leaderboard/${message.guild.id})]`)
            .setFooter(`Made by Mingull`, client.user.displayAvatarURL({ dynamic: true }))
        const results = await conn.query(`SELECT * FROM GuildMemberMessage WHERE guildId = '${message.guild.id}' ORDER BY memberLevel DESC, memberXP DESC, messageCount DESC LIMIT 5`)
        results[0].forEach((result, key) => {
            const member = getMember(message, result.memberId)
            embed.addField(`${key + 1} ${member.user.username}`, `**Level:** ${result.memberLevel}\n**XP:** ${result.memberXP}\n**Messages:** ${result.messageCount}`)
        })
        message.channel.send(embed);
    }
}