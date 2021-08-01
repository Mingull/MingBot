const { MessageEmbed } = require("discord.js")
const { getMember, formatDate, getConnection } = require("../../backend/functions")
module.exports = {
    name: "whois",
    category: "General",
    aliases: ["who"],
    description: "This gives you information about a specific person",
    usage: "[mention | id]",
    args: false,
    private: false,
    cooldown: 0,
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        const joined = formatDate(member.joinedAt);
        const created = formatDate(member.user.createdAt);

        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join("\n ") || "NONE";

        const conn = await getConnection()
        const results = await conn.query(`SELECT * FROM MemberEconomy WHERE memberId = '${member.id}'`);
        const balance = results[0][0].memberMoney === undefined || results[0][0].memberMoney === null ? 0 : results[0][0].memberMoney;

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .setTitle("MEMBER INFORMATION")
            .addField("Display name", `\`\`\`${member.displayName}\`\`\``, true)
            .addField("Joined at", `\`\`\`${joined}\`\`\``, true)
            .addField("Created at", `\`\`\`${created}\`\`\``, true)
            .addField("Roles", `${roles}`, true)
            .addField("Global Balance", `\`\`\`M${balance}\`\`\``, true)

        message.channel.send(embed);
    }
}