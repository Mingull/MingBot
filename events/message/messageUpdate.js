const { MessageEmbed } = require("discord.js");

module.exports = async (Discord, client, oldMessage, newMessage) => {
    if (!newMessage.partial) {
        if (newMessage.author.bot) return;
        if (oldMessage.content === newMessage.content) return;
        // var embed = new MessageEmbed()
        //     .setAuthor(`Message edit by ${newMessage.author.tag} (${newMessage.author.id})`, newMessage.author.avatarURL({ size: 4096 }))
        //     .setDescription(`A message has been edited in ${newMessage.channel}\n **Before:** \`${oldMessage.content}\`\n**After:** \`${newMessage.content}\``)
        //     .setTimestamp()
        //     .setFooter(`Author: ${newMessage.author.id}`)
        const embed = new MessageEmbed()
            .setTitle('A message has been edited')
            .setDescription(`A message by ${newMessage.author.tag} was deleted by him or herself\n**Channel:**  ${messageDeleted.channel}\n**Content:** \`\`\`${content}\`\`\``)
            .setTimestamp()
            .setFooter(`Author ID: ${messageDeleted.author.id}\nMessage ID: ${messageDeleted.id}`)
        client.channels.cache.get('829339861247983676').send(embed);
    }
}