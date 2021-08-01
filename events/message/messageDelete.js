const { MessageEmbed } = require("discord.js");
const { getConnection } = require('../../backend/functions')

module.exports = async (Discord, client, message) => {
    if (!message.partial) {
        if (message.author.bot) return;
        const conn = await getConnection();
        const result = await conn.query(`SELECT * FROM GuildConfigurable WHERE guildId = '${message.guild.id}'`)
        if (!result[0].length == 0 || !result[0][0] == undefined) {
            const modLogId = result[0][0].modLogId
            if (!modLogId) return message.channel.send("You don't have a mod log channel set up!");
            let content = message.content;
            if (!content) content = 'no content found'

            const fetchedLogs = await message.guild.fetchAuditLogs()
            const deletionLog = fetchedLogs.entries.first();
            if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

            const { executor, target } = deletionLog;
            var removerStr;
            if (target.id === message.author.id) {
                removerStr = `A message by ${message.author.tag} was deleted by ${executor.tag}.`;
            } else {
                removerStr = `A message by ${message.author.tag} was deleted by him or herself`;
            }

            const embed = new MessageEmbed()
                .setTitle('A message has been deleted')
                .setDescription(`${removerStr}\n**Channel:**  ${message.channel}\n**Content:** \`\`\`${content}\`\`\``)
                .setTimestamp()
                .setFooter(`Author ID: ${message.author.id}\nMessage ID: ${message.id}`)

            client.channels.cache.get(modLogId).send(embed);
        }
    }
}