const { MessageEmbed, Client, Message } = require("discord.js");
const { botInfo, PREFIX } = require("../../backend/config.json");
const { getMember } = require("../../backend/functions");
const { stripIndents } = require("common-tags");

module.exports = {
    name: 'info',
    aliases: [],
    category: "General",
    description: "Returns latency and API ping",
    usage: "<bot | guild/server>",
    args: true,
    private: false,
    cooldown: 0,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const infoEmbed = new MessageEmbed()
            .setColor("RANDOM")

        const infoMsg = await message.channel.send(`Collecting all the data`);
        if (!args[0]) return infoMsg.edit(`Usage: ${PREFIX}info <bot | guild/server>`);

        if (args[0] === "bot") {
            const name = message.guild.me.displayName;
            const { author, createdAt, version, description: desc } = botInfo;
            const getAuthor = getMember(message, author);
            infoEmbed.setTitle("Bot information")
                .addField("Name", `${client.user} \`(${client.user.id})\``, true)
                .addField("Author", `${getAuthor.user} \`(${getAuthor.user.tag})\``, true)
                .addField("Version", `\`${version}\``, true)
                .addField("Created on", `\`${createdAt}\``, true)
                .addField("Description", `\`${desc}\``, true)
                .addField("Running on", client.guilds.cache.size == 1 ? `\`${client.guilds.cache.size} server\`` : `\`${client.guilds.cache.size} servers\``, true)
                .setThumbnail(client.user.displayAvatarURL())
            // infoEmbed.addField(`Bot information`, stripIndents`**>> Name:** ${name}
            // **>> Author:** ${author} (${getAuthor.user.tag})
            // **>> Version:** ${version}
            // **>> Created on:** ${createdAt}
            // **>> Description:** ${desc}
            // **>> Running on: ** \`${client.guilds.cache.size} servers\``)
            //     .setThumbnail(client.user.displayAvatarURL())
            //     .setColor("GREEN")
        }
        else if (args[0] === "guild" || args[0] === "server") {
            const guildName = message.guild.name;
            const owner = message.guild.owner;
            const members = message.guild.members.cache.map(user => user.user)
            let totalBots = 0;
            members.forEach(user => {
                if (user.bot) {
                    totalBots = totalBots + 1;
                }
            })
            // console.log(message.guild.roles.cache.filter(role => console.log(role.)));
            const roles = message.guild.roles.cache
                .filter(role => role.color != 0)
                .sort(function (a, b) { return b.rawPosition - a.rawPosition })
                .map(role => role)
                .join(", ");
            const createdAt = message.guild.createdAt;
            infoEmbed.setTitle("💻GUILD INFORMATION💻")
                .addField("Name", `\`\`\`${guildName}\`\`\``)
                .addField("Owner", `\`\`\`${owner.user.tag}\`\`\``, true)
                .addField("Members", `\`\`\`${message.guild.memberCount}\`\`\``, true)
                .addField("Server id", `\`\`\`${message.guild.id}\`\`\``, false)
                .addField("Roles", `${roles}`, false)
                .addField("Created on", `\`\`\`${createdAt}\`\`\``, false)
                .setThumbnail(message.guild.iconURL())
            // infoEmbed.addField(`Guild information`, stripIndents`**>> Name:** ${guildName}
            // **>> Owner:** ${owner} (${owner.id})
            // **>> Members:** ${message.guild.memberCount}
            // **>> Bots:** ${totalBots}
            // **>> Created on:** ${createdAt}`)
            //     .setThumbnail(message.guild.iconURL())
        } else return infoMsg.edit(`Usage: ${PREFIX}info <bot | guild/server>`);

        infoMsg.edit("Collected");
        infoMsg.edit(infoEmbed);
    }
}