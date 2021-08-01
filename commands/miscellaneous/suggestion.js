const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggestion",
    aliases: ["suggest", "suggestions"],
    category: "Miscellaneous",
    description: "Make a suggestion",
    usage: "<suggestion>",
    args: true,
    private: false,
    cooldown: 0,
    run: async (client, message, args) => {
        const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
        if (!channel) return message.channel.send("Suggestions channel does not exist in this guild!");
        if (args.length == 0) return message.channel.send("Why are you suggesting noting?")

        let messageArgs = args.join(' ');
        const embed = new MessageEmbed()
            .setColor('FADF2E')
            .setAuthor(`Suggestion submitted by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .addField("Suggestion", messageArgs)
            .addField("Status", "Not implemented yet xD")
            .setTimestamp()

        channel.send(embed).then((msg) => {
            msg.react('✅')
            msg.react('❌')
            msg.react('🗑')
            message.delete();
        }).catch((err) => console.error(err));
    }
}