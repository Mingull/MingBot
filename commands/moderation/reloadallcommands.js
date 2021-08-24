const { Client, Message } = require("discord.js");
const { glob } = require("glob");

module.exports = {
    name: "reloadallcommands",
    aliases: ["rac"],
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
        if (message.author.id !== '149233694253645824') return;
        message.delete();
        client.commands.sweep(() => true)
        // let num = 0;
        glob(`${__dirname}/../**/*.js`, async (err, filePath) => {
            if (err) return console.log(err)
            filePath.forEach((file) => {
                delete require.cache[require.resolve(file)];

                const pull = require(file);

                if (pull.name) {
                    // console.log(`${++num < 10 ? ` ${num}` : `${num}`} - ${pull.name} has been reloaded`);
                    client.commands.set(pull.name, pull);
                }

                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.name)
                    })
                }
            })
        })
    }
}