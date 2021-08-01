const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { capitalize } = require("../../backend/functions");
module.exports = {
    name: "help",
    aliases: ["?"],
    category: "General",
    description: "Gives you a list of commands",
    usage: "[category | command]",
    args: false,
    private: false,
    cooldown: 0,
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        if (!args[0]) {
            const categoryConfig = require("../../commands/config.json");
            categoryConfig.forEach(c => {
                embed.addField(`${c.emoji ? c.emoji : ''} ${c.title}`, `\`\`\`${c.description}\`\`\``, true)
            })
            return message.channel.send(embed);
        }
        if (args[0]) {
            const category = client.categories.filter(c => c.match(args[0]))[0]
            if (category) {
                const commands = fs.readdirSync(`./commands/${category}`).filter(f => f.endsWith('.js'));
                for (const command of commands) {
                    const cmd = require(`../../commands/${category}/${command}`)
                    if (cmd.name) {
                        embed.setAuthor(`${capitalize(category)} Command help`, client.user.displayAvatarURL({ dynamic: true }))
                            .addField(cmd.name, `\`${cmd.aliases.length ? cmd.aliases.map(alias => `${alias}`).join(", ") : "No aliases"}\``, true)
                    } else {
                        console.log("error?");
                    }
                }
            } else {
                const cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
                if (!cmd) return message.channel.send(`Invalid command named. \`${args[0]}\``);
                embed.setAuthor(`${capitalize(cmd.name)} Command help`, client.user.displayAvatarURL({ dynamic: true }))
                    .addField('Aliases', `\`${cmd.aliases.length ? cmd.aliases.map(alias => `${alias}`).join(", ") : "No aliases"}\``, true)
                    .addField('Category', `\`${cmd.category}\``, true)
                    .addField('Description', `\`${cmd.description}\``, true)
                    .addField('Usage', `\`${cmd.usage}\``)
            }
            return message.channel.send(embed);
        }
    }
}