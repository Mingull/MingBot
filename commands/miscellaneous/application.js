module.exports = {
    name: "application",
    aliases: ["apply"],
    description: "This command is still in development",
    category: "Miscellaneous",
    usage: "<create | delete>",
    args: true,
    cooldown: 0,
    run: async (client, message, args) => {
        // basic vars
        const guild = message.guild;
        const guildID = guild.id;
        const channelName = "apply-" + message.author.username.toLowerCase() + message.author.discriminator;
        const questions = ["Put here some questions", "some other question"];
        const answers = [];

        // if statements
        if (!args[0]) {
            return message.channel.send(`Please provide the argument \`create\` to get started with your application.`)
        };
        if (args[0] == "create") {
            guild.channels.cache.find(channel => {
                if (channel.name == channelName) message.channel.send("You already have a application going on.\n you could do  \`delete\` instead to remove your current application");
            });
        } else if (args[0] == "delete") {
            guild.channels.cache.find(channel => {
                if (!channel.name == channelName) message.channel.send("You don't have a application going on.\n make one by doing ");
            });
        }
    }
}