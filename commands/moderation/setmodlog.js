const { getConnection, getMember } = require("../../backend/functions");

module.exports = {
    name: 'modlog',
    aliases: ['setmodlog', 'setmod', 'setlog', 'sml'],
    category: 'Moderation',
    description: "Setup a modlog channel",
    usage: '<channelId | mention channel>',
    args: true,
    cooldown: 0,
    run: async (client, message, args) => {
        if (!getMember(message, message.author.id).hasPermission('MANAGE_GUILD'))
            return message.channel.send("You dont have the right permissions to execute this command!")
            
        const conn = await getConnection();
        const filter = (m) => m.author.id === message.author.id;
        const result = await conn.query(`SELECT * FROM GuildConfigurable WHERE guildId = '${message.guild.id}'`);
        if (!result[0].length == 0 || !result[0][0] == undefined) {
            message.channel.send('Setting up the modlog channel...').then(msg => msg.delete({ timeout: 200 }));

            const { modLogId } = result[0][0];
            if (modLogId != null) {
                const msg = await message.channel.send(`you already have an modlog channel: <#${modLogId}>\nwould you like to make a to change it? \`y\` or \`n\``);
                let time = 1000 * 120;
                const collection = await msg.channel.awaitMessages(filter, { time: time, max: 1, errors: ['time'] }).catch(() => msg.send("You didn't answer in time"));
                if (collection.first().content === 'y') {
                    const modLogChannel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id === args[0]);
                    if (!modLogChannel) return message.channel.send(`You didn't mention a channel or provided a channel id!`);
                    conn.query(`UPDATE GuildConfigurable SET modLogId = '${modLogChannel.id}' WHERE guildId = '${message.guild.id}'`);
                    message.channel.send(`Modlog has been set to: ${modLogChannel}`);
                } else if (collection.first().content === 'n') {
                    return message.channel.send(`The modlog has not been changed, its still <#${modLogId}>`);
                }
            } else {
                const modLogChannel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id === args[0]);
                if (!modLogChannel) return message.channel.send(`You didn't mention a channel or provided a channel id!`);
                conn.query(`UPDATE GuildConfigurable SET modLogId = '${modLogChannel.id}' WHERE guildId = '${message.guild.id}'`);
                message.channel.send(`Modlog has been set to: ${modLogChannel}`);
            }
        }
    }
}