const { MessageEmbed, MessageCollector, Collection, Client, Message } = require("discord.js");
const { getConnection, getGuildCommandPrefixes } = require("../../backend/functions");

let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id
module.exports = {
    name: "addreactrole",
    aliases: ["addrr", "arr"],
    category: "Moderation",
    description: "add a reaction role",
    usage: "<channel id>",
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
        if (args.length !== 1) {
            return message.channel.send(`Too many or too less arguments. Must be 1 message id`).then(msg => msg.delete({ timeout: 3500 }))
        } else {
            try {
                let fetchedMsg = await message.channel.messages.fetch(args[0])
                let emojiRoleMappings = new Map()
                if (fetchedMsg) {
                    await message.channel.send('Please provide all of the emoji names with the role name, one by one, separated with a comma.\ne.g: \`emoji-name, role-name\`\nWhere the emoji name comes first, role name comes second')
                    let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message));
                    collector.on('collect', msg => {
                        if (msg.content.toLowerCase() === `done` || msg.content.toLowerCase() === 'stop') {
                            collector.stop('done with adding roles');
                            return;
                        }
                        let [emojiName, roleName] = msg.content.split(/,\s+/);
                        if (!emojiName && !roleName) return;

                        let emoji = msg.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase())
                        if (!emoji) {
                            msg.channel.send("Emoji does not exist. Please try again.")
                                .then(msg => { setTimeout(() => msg.delete(), 3500) })
                                .catch(err => console.error(err))
                            return;
                        }
                        let role = msg.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase())
                        if (!role) {
                            msg.channel.send("Role does not exist. Please try again.")
                                .then(msg => { setTimeout(() => msg.delete(), 3500) })
                                .catch(err => console.error(err))
                            return;
                        }
                        fetchedMsg.react(emoji)
                            .then(emoji => console.log('Reacted'))
                            .catch(err => console.log(err))
                        emojiRoleMappings.set(emoji.id, role.id);
                        console.log(emojiRoleMappings);
                    })
                    collector.on('end', async (collected, reason) => {
                        const conn = await getConnection();
                        const results = await conn.query(`SELECT * FROM GuildReactionRole WHERE guildId = '${message.guild.id}' and MessageId = '${fetchedMsg.id}'`)
                        if (!results[0].length == 0 || !results[0][0] == undefined) {
                            return console.log(results[0])
                            emojiRoleMappings.forEach((value, key) => {
                                console.log(key, value)
                                // if (results)
                            })
                        }
                    })
                }
            } catch (err) {
                console.log(err);
                message.channel.send('Invalid message id. Message was not found.').then(msg => { setTimeout(() => msg.delete(), 3500) })
            }
        }
    }
}