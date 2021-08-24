const { Permissions, Client, Message } = require("discord.js")
module.exports = {
    name: 'clear',
    aliases: ["clean", "purge", "nuke"],
    category: "Moderation",
    description: "Clears the chat",
    usage: '<amount>',
    args: true,
    private: true,
    cooldown: 0,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
            return message.reply({ content: "You can't delete messages...", allowedMentions: { repliedUser: false } })
                .then(msg => { setTimeout(() => msg.delete(), 3000) });


        if (isNaN(args[0]) || parseInt(args[0]) <= 0)
            return message.reply({ content: "Yeah... thats not a number? I also can't delete 0 messages BTW!", allowedMentions: { repliedUser: false } })
                .then(msg => { setTimeout(() => msg.delete(), 3000) });


        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
            return message.reply({ content: "I can't delete messages...", allowedMentions: { repliedUser: false } })
                .then(msg => { setTimeout(() => msg.delete(), 3000) });

        let deleteAmount;

        parseInt(args[0]) > 100 ? deleteAmount = 100 : deleteAmount = parseInt(args[0]);

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send({ content: `Clearing \`${deleted.size.toString()} messages\`` }))
            .catch(err => {
                message.reply({ content: 'Something went wrong...', allowedMentions: { repliedUser: false } });
                console.log(err);
            })
            .then(msg => { setTimeout(() => msg.delete(), 3000) });
    }
}